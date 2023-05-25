const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    reviewFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedbackFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    performanceReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PerformanceReview'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedback;