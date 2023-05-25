const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
    reviewFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    strengths: {
        type: String,
        required: true
    },
    weaknesses:{
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true
    },
    feedbacks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    }]
});

const PerformanceReview = mongoose.model('PerformanceReview',performanceReviewSchema);

module.exports = PerformanceReview;