//require all the dependencies here
//entry point of routing
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home-controller');
const usersController = require('../controllers/users-controller');

//route defined for / which redirects to home action in home controller
router.get('/',homeController.home);
//route for signin page
router.get('/signin',homeController.signIn);
//route for signup page
router.get('/signup',homeController.signUp);
//use /admin route to redirect to admin page
//isAdminAuthenticated middleware can also be applied here 
//to check only administrators are allowed to access admin related things
router.use('/admin',require('./admin'));
//use /user route to redirect to user page
router.use('/user',require('./user'));
//use /user route to redirect to user page
router.use('/employee',require('./employee'));

//exported the router
module.exports = router;