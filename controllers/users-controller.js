const PerformanceReview = require('../models/performance-review');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.create = async function(req,res){
    try{
        //grab all the required fields from front end
        const {name,email,password,confirmPassword,role} = req.body;

        //check for edge cases 
        if(password != confirmPassword){
            req.flash('error', 'Password and confirm password do not match');
            return res.redirect('back');
        }

        const user = await User.findOne({email});

        //if the user already exist redirect it to sign in page
        if(user){
            req.flash('error', 'User Already Exists');
            if(!req.isAuthenticated()){
                return res.redirect('/signin');
            }else{
                return res.redirect('back');
            }        
        }

        //create hash for password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Store the hash in your database
        //create the new user with the inputs
        await User.create({
            name,
            email,
            password: hash,
            role: role ?? 'employee'
        });

        //Redirect User back to Login Page
        req.flash('success', 'User Registered');
        if(!req.isAuthenticated()){
            return res.redirect('/signin');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        //incase something went wrong
        console.log(err);
        return res.redirect('back');
    }
}

//Create session is the action called after passport intializes identity in session and redirects user to profile page
module.exports.createSession = function(req,res){
    req.flash('success','Logged In!');
    //if the role of user is admin then redirect it to admin page else to employee dashboard page
    if(req.user.role == 'admin'){
        res.redirect('/admin/dashboard');
    }else{
        res.redirect('/employee/dashboard');
    }
}

//Action to log out the user if its session exists in the server using passport which provides logout function
module.exports.destroySession = function(req,res){
    //using passport logout function
    req.logout(function(err) {
        if (err) { 
            req.flash('error',err);
            return next(err); 
        }
        req.flash('success','Logged Out!');
        res.redirect('/');
    });
}

//Action to update the user (Only admin can update the user)
module.exports.updateUser = async function(req,res){
    try {

        //grab all the fields from body
        const {id,name,email,password,role} = req.body;
        const user = await User.findById(id);
        let hash = password;
        //incase user has updated password before hashing check if he has actually changed the password
        if(password != user.password){
            console.log("here");
            let salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(password, salt);
        }

        //find the user with id and update the remaining fields
        await User.findByIdAndUpdate(id,{
            name,
            email,
            password: hash,
            role
        });

        //once successful prompt the user and redirect to home
        req.flash('success','User Updated!');
        res.redirect('back');

    } catch (error) {
        //incase something went wrong
        console.log(error);
        return res.redirect('back');
    }

}


//create action to delete a user 
module.exports.deleteUser = async function(req,res){

    try {
        //grab the user id which is going to get deleted from body
        const { id } = req.body;

        //delete all its linked performance review
        await PerformanceReview.deleteOne({reviewFor:id})

        //find the user by id and delete it
        await User.findByIdAndDelete(id);


        req.flash('success','User Deleted!');
        return res.redirect('back');

    } catch (error) {
        //incase something went wrong
        console.log(error);
        return res.redirect('back');
    }

}

//Action to view the details of the user
module.exports.viewUser = async function(req,res){
    try {

        //grab the id to fetch the user
        const { id } = req.body;

        //fetch the user with the id
        const selectedUser = await User.findById(id);

        //display the user which is selected
        return res.render('./admin/user-section/admin-view-user',{
            title: "View User",
            selectedUser,
            isSelected: true
        });

    } catch (error) {
        //incase something went wrong
        console.log(error);
        return res.redirect('back');
    }
}

//Action defined to add performance review for the user
module.exports.addPerformanceReview = async function(req,res){
    try {
        //grab all the necessary fields
        const {reviewFor,rating,strengths,weaknesses,review} = req.body;

        const checkPRExists = await PerformanceReview.findOne({reviewFor});

        //check if PR already exists
        if(checkPRExists){
            req.flash('error',"Performance Review already exists for this employee");
            return res.redirect('back');
        }

        //create the Performance review and add that Performance review to the user
        const performanceReview = new PerformanceReview({
            reviewFor,rating,strengths,weaknesses,review
        });

        const savedPerformanceReview = await performanceReview.save();
        //Add the performance review for user in performance review array of user
        await User.findByIdAndUpdate(reviewFor,{$push: {performanceReviews: savedPerformanceReview}});

        req.flash('success','Added Performance Review!');
        return res.redirect('/admin/dashboard');
        
    } catch (error) {
        //incase something went wrong
        req.flash('error',"Something went wrong");
        console.log(error);
        return res.redirect('back');
    }
}


//Action to view the details of the performance review
module.exports.viewReview = async function(req,res){
    try {

        //grab the id to fetch the user
        const { id } = req.body;

        //fetch the user with the id
        const performanceReview = await PerformanceReview.findById(id).populate('reviewFor').populate({
            path: 'feedbacks',
            populate:{
                path: 'feedbackFrom'
            }
        });
        console.log(performanceReview);
        return res.render('./admin/pr-section/admin-view-pr',{
            title: "View Review",
            performanceReview,
            isSelected: true
        });

    } catch (error) {
        //incase something went wrong
        console.log(error);
        return res.redirect('back');
    }
}


//Action to Update the performance review
module.exports.updateReview = async function(req,res){
    try {
        //grab the id to fetch the user
        const { reviewFor,rating,strengths,weaknesses,review } = req.body;

        //fetch the user with the id
        await PerformanceReview.findByIdAndUpdate(reviewFor,{
            rating,strengths,weaknesses,review
        });

        req.flash('success',"Performance Review Update for user!")
        return res.redirect('back');

    } catch (error) {
        //incase something went wrong
        console.log(error);
        return res.redirect('back');
    }
}

//Action to assign performance review to its fellow employees
module.exports.assignPerformanceReview = async function(req,res){
    try {
        //grab the id to fetch the user
        const { prId,feedbackFrom } = req.body;

        //first check feedback requested is not same for which performance review is created
        const performanceReview = await PerformanceReview.findById(prId).populate('reviewFor');
        const feedbackFromUser = await User.findById(feedbackFrom).populate('feedbacksAwaited');
        //User should not be allowed to get feedback on their own PR
        if(performanceReview.reviewFor.email == feedbackFromUser.email){
            req.flash('error','Cannot assign Performance Review to the same user');
            return res.redirect('back');
        }

        //don't assign if the feedback is already assigned
        for(let feedback of feedbackFromUser.feedbacksAwaited){
            if(feedback._id.equals(prId)){
                req.flash('error','Feedback Already assigned');
                return res.redirect('back');
            }
        }

        //push the feedback awaited from the user
        await User.findByIdAndUpdate(feedbackFrom,{$push: {feedbacksAwaited: prId}});
    
        req.flash('success',"Performance Review Assigned to the user!")
        return res.redirect('back');

    } catch (error) {
        //incase something went wrong
        req.flash('error',"Something went wrong");
        console.log(error);
        return res.redirect('back');
    }
}

