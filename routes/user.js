//require all the dependencies here
//entry point of routing
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const passport = require('passport');
const { isAdminAuthenticated } = require('../middlewares/adminAuthenticated');

//use /create route to post a user or push a user in database
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate('local',{ failureRedirect: '/signin'}),usersController.createSession);
router.get('/destroy-session',usersController.destroySession);
router.post('/update-user',isAdminAuthenticated,usersController.updateUser);
router.post('/delete',isAdminAuthenticated,usersController.deleteUser);
router.post('/fetch',isAdminAuthenticated,usersController.viewUser);
router.post('/add-review',isAdminAuthenticated,usersController.addPerformanceReview);
router.post('/view-review',isAdminAuthenticated,usersController.viewReview);
router.post('/update-review',isAdminAuthenticated,usersController.updateReview);
router.post('/assign-review',usersController.assignPerformanceReview);

//exported the router
module.exports = router;