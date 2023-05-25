//require all the dependencies here
//entry point of /admin
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const { isAdminAuthenticated } = require('../middlewares/adminAuthenticated');

// /dashboard route to redirect to dashboard of admin page
router.get('/dashboard',isAdminAuthenticated,adminController.dashboard);
// to render add user page
router.get('/add-user',isAdminAuthenticated,adminController.addUser);
// to render update user page
router.get('/update-user',isAdminAuthenticated,adminController.updateUser);
//to post to update user page
router.post('/update-user',isAdminAuthenticated,adminController.updateSelectedUser);
// to render view user page
router.get('/view-user',isAdminAuthenticated,adminController.viewUser);
// to render delete user page
router.get('/delete-user',isAdminAuthenticated,adminController.deleteUser);
// to render add review  page
router.get('/add-pr',isAdminAuthenticated,adminController.addReviewPage);
// to render update review  page
router.get('/update-pr',isAdminAuthenticated,adminController.updateReviewPage);
//to post data to user review page
router.post('/update-pr',isAdminAuthenticated,adminController.fetchReview);
// to render view review  page
router.get('/view-pr',isAdminAuthenticated,adminController.viewReviewPage);
// to render assign review page
router.get('/assign-pr',isAdminAuthenticated,adminController.assignReviewPage);


//exported the router
module.exports = router;