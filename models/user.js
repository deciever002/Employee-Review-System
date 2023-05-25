const mongoose = require('mongoose');

//define a schema for users where user can be a admin or employee
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin','employee'],
        default: 'employee',
        required: true
    },
    performanceReviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PerformanceReview'
    }],
    feedbacksAwaited:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'PerformanceReview'
    }]
});

//model this into mongoose model and export it
const User = mongoose.model("User",userSchema);

module.exports = User;