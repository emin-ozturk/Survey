const express = require('express')
const mongoose = require('mongoose')
const Survey = require('./models/survey')

const app = express()

const URL = 'mongodb://localhost:27017/survey'
mongoose.set('strictQuery', true)
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("MongoDB'ye bağlandı"))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('create-survey')
})

app.post('/', (req, res) => {
    const { question, answers } = req.body

    const answersAndVoteCount = []
    answers.forEach(answer => {
        answersAndVoteCount.push({answer: answer, count: 0})
    })

    const survey = new Survey()
    survey.question = question
    survey.answers = answersAndVoteCount
    survey.totalAnswerCount = answers.length 
    survey.totalVoteCount = 0
    survey.save()
        .then((response) => {
            res.redirect('/' + response._id)
        })
        .catch((err) => {
            res.send(err)
        })

})

app.get('/:surveyId', async (req, res) => {
    const surveyId = req.params.surveyId
    const survey = await Survey.findOne({ '_id': surveyId })
    res.render('survey', { 'survey': survey })
})

app.post('/insert-survey', async (req, res) => {
    const { surveyId, answerIndex } = req.body
    const survey = await Survey.findOne({ '_id': surveyId })

    var answers = survey.answers
    answers[answerIndex]['count'] += 1
    survey.answers = answers

    survey.totalVoteCount += 1

    Survey.findByIdAndUpdate(surveyId, survey)
        .then((response) => {
            res.json({link: '/' + surveyId})
        })
        .catch((err) => {
            res.send(err)
        })

})

app.listen(3000, () => {
    console.log('Server başladı')
})