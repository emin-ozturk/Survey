const answers = document.querySelectorAll('.answerProgressBar')
const answersArray = [].slice.call(answers)

answersArray.forEach(answer => {
    answer.addEventListener('click', (e) => {

        const answerIndex = answer.dataset.answer_index
        const surveyId = answer.dataset.survey_id

        socket.emit('SET_VOTE', {
            answerIndex: answerIndex,
            surveyId: surveyId,
        })
    })
})