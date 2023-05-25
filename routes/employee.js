//require all the dependencies here
//entry point of routing for /employee
const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employee-controller');
const passport = require('passport');
const { isEmployeeAuthenticated } = require('../middlewares/employeeAuthenticated');

//use /dashboard to show employee dashboard
router.get('/dashboard',isEmployeeAuthenticated,employeesController.dashboard);
router.get('/add-feedback',isEmployeeAuthenticated,employeesController.selectFeedback);
router.post('/add-feedback',isEmployeeAuthenticated,employeesController.addSelectedFeedback);
router.post('/submit-feedback',isEmployeeAuthenticated,employeesController.submitFeedback);

//exported the router
module.exports = router;