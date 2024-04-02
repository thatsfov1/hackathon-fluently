const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({
    title: String,
    minutesReading: Number,
    article: String,
    image: String,
    topic: {
        type: String,
        enum: ["Health and Wellness", "Technology and Innovation", "Travel and Adventure", "Education and Learning", "Business and Entrepreneurship", "Environment and Sustainability", "Arts and Culture", "Science and Discovery", "Relationships and Psychology", "Lifestyle and Self-Improvement"]
    },
    languageLevel: {
        type: String,
        enum: ["Beginner", "Pre-intermediate", "Intermediate", "Upper-intermediate", "Advanced", "Mastery"]
    },
})

const ArticleModel = mongoose.model('articles', ArticleSchema)

module.exports = ArticleModel;