const Feedback = require("../models/feedback");
const PerformanceReview = require("../models/performance-review");
const User = require("../models/user");

//action to render dashboard page for employee
module.exports.dashboard = function(req,res){
    return res.render('./employee/employee-dashboard',{
        title: "Employee Dashboard"
    });
}

//Action to select feedbacks from the list of feedbacks
module.exports.selectFeedback = async function(req,res){
    try {

        // submit feedbacks awaited for user
        const user = await User.findById(req.user._id)
        .populate({
            path: 'feedbacksAwaited',
            populate: {
                path: "reviewFor"
            }
        });
        
        //feedbacks are added to performance reviews
        const feedbacksAssignedToUser = user.feedbacksAwaited;
        console.log(feedbacksAssignedToUser);

        return res.render('./employee/add-feedback.ejs',{
            title: "Add Feedback",
            isSelected: false,
            feedbacks: feedbacksAssignedToUser
        })

    } catch (error) {
        req.flash('error',"Something Went Wrong");
        console.log(error);
        return res.redirect('back');
    }

}


module.exports.addSelectedFeedback= async function(req,res){

    try {
        //grab the id of selected feedback from body
        const { feedbackForPR } = req.body;

        //feedbacks are given to performance reviews
        const performanceReview = await PerformanceReview.findById(feedbackForPR).populate('reviewFor');

        //render the page to submit the feedback
        return res.render('./employee/add-feedback.ejs',{
            title: "Add Feedback",
            isSelected: true,
            performanceReview
        });

    } catch (error) {
        req.flash('error',"Something Went Wrong");
        console.log(error);
        return res.redirect('back');
    }
    
}

module.exports.submitFeedback = async function(req,res){
    try {

        //grab all the necessary fields 
        const {strengths,weaknesses,review,reviewFor,prId} = req.body;

        //create the feedback
        const feedback = await Feedback.create({strengths,weaknesses,review,reviewFor,performanceReview:prId,feedbackFrom:req.user._id});
        //add this feedback to the performance review 
        await PerformanceReview.findByIdAndUpdate(prId,{
            $push: {feedbacks: feedback._id}
        });

        //submit the feedback
        //after submitting feedback pull the feedback out from the list of feedbacks assigned
        await User.findByIdAndUpdate(req.user._id,{
            $pull: {feedbacksAwaited: prId}
        });

        req.flash('success',"Feedback Added!");
        return res.redirect('/employee/add-feedback');

    } catch (error) {
        req.flash('error',"Something Went Wrong");
        console.log(error);
        return res.redirect('back');
    }
}