const mongoose = require('mongoose')
const Schema = mongoose.Schema

const surveySchema = new Schema({
    question: String,
    answers: Array,
    totalAnswerCount: Number,
    totalVoteCount: Number,
})

const Survey = mongoose.model('Survey', surveySchema)
module.exports = Survey