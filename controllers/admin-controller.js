const PerformanceReview = require("../models/performance-review");
const User = require("../models/user");

//action to render dashboard page for admin
module.exports.dashboard = function(req,res){
    res.render('./admin/admin-dashboard',{
        title: "Admin Dashboard"
    });
}

//action to render add-employee page for admin
module.exports.addUser = function(req,res){
    res.render('./admin/user-section/admin-add-user',{
        title: "Add user"
    });
}


//action to render update-user page for admin
module.exports.updateUser = async function(req,res){
    //find all the users and provide to locals to fetch all the user details
    let users = await User.find();
    //filter the user array apart from the user logged in the user can update other users
    users = users.filter((item) => {
        return !item._id.equals(req.user._id)
    });
    console.log(users);
    res.render('./admin/user-section/admin-update-user',{
        title: "Update user",
        users,
        isUserFetched: false //this is false because the particular user is not selected yet
    });
}

//action to render update-user page for admin
module.exports.updateSelectedUser = async function(req,res){
    let user = await User.findById(req.body.id);
    return res.render('./admin/user-section/admin-update-user',{
        title: "Update user",
        user,
        isUserFetched: true //this is true because the particular user is now selected or fetched by using id
    });
}


//action to render delete-user page for admin
module.exports.deleteUser = async function(req,res){
    //find all the users and provide to locals to fetch all the user details
    let users = await User.find();
    //filter the user array apart from the user logged in the user can update other users
    users = users.filter((item) => {
        return !item._id.equals(req.user._id)
    });
    return res.render('./admin/user-section/admin-delete-user',{
        title: "Delete user",
        users
    });
}


//action to render view-user page for admin
module.exports.viewUser = async function(req,res){
    //find all the users and provide to locals to fetch all the user details
    let users = await User.find();

    return res.render('./admin/user-section/admin-view-user',{
        title: "View User",
        users,
        isSelected: false
    });
}

//action to render add review  page for admin
module.exports.addReviewPage = async function(req,res){
    //find all the users and provide to locals to fetch all the user details
    let users = await User.find();
    //filter the user array apart from the user logged in
    //also there is no reason for assigning performance review to admins
    users = users.filter((item) => {
        return !item._id.equals(req.user._id) && item.role == 'employee'
    });

    return res.render('./admin/pr-section/admin-add-pr',{
        title: "Add Review",
        users
    });
}

//action to render update review  page for admin
module.exports.updateReviewPage = async function(req,res){
    //find all the performance reviews and populate it with users
    const performanceReviews = await PerformanceReview.find().populate('reviewFor');

    return res.render('./admin/pr-section/admin-update-pr',{
        title: "Update Review",
        performanceReviews,
        isSelected: false
    });
}


//Action to fetch the performance review
module.exports.fetchReview = async function(req,res){
    try {
        //grab the id to fetch the performance review
        const { id } = req.body;

        //fetch the PR with the id
        const performanceReview = await PerformanceReview.findById(id).populate('reviewFor');

        return res.render('./admin/pr-section/admin-update-pr',{
            title: "Update Review",
            performanceReview,
            isSelected: true
        });

    } catch (error) {
        //incase something went wrong
        console.log(error);
        return res.redirect('back');
    }
}

//action to render view review  page for admin
module.exports.viewReviewPage = async function(req,res){
    //find all the performance reviews and populate it with users
    const performanceReviews = await PerformanceReview.find().populate('reviewFor');

    //pass performance reviews to render page of view performance review
    return res.render('./admin/pr-section/admin-view-pr',{
        title: "View Review",
        performanceReviews,
        isSelected: false
    });
}

//action to render assign review  page for admin
module.exports.assignReviewPage = async function(req,res){
    //find all the performance reviews and populate it with users
    const performanceReviews = await PerformanceReview.find().populate('reviewFor');

    //find all the users and provide to locals to fetch all the user details
    let users = await User.find();
    //filter the user array apart from the user logged in
    //also there is no reason for admins to assign a review
    users = users.filter((item) => {
        return !item._id.equals(req.user._id) && item.role == 'employee'
    });

    return res.render('./admin/pr-section/admin-assign-pr',{
        title: "Assign Review",
        performanceReviews,
        users
    });
}


