const answers = document.querySelectorAll('.answerProgressBar')
const answersArray = [].slice.call(answers)

answersArray.forEach(answer => {
    answer.addEventListener('click', (e) => {
        const answerIndex = answer.dataset.answer_index
        const surveyId = answer.dataset.survey_id
        const endpoint = 'insert-survey'
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                answerIndex: answerIndex,
                surveyId: surveyId,
            })
        })
        .then((response) => response.json())
        .then((data) => window.location.href = data.link)
        .catch((err) => {
            console.log(err)
        })
    })
})