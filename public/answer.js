const maxAnswerCount = 5
var answerCount = 2
function insertNewAnswer() {
        
    if (answerCount == maxAnswerCount) {
        return
    }

    answerCount++

    const answerId = randomId()
    var newAnswerContainer = document.createElement("div")
    newAnswerContainer.setAttribute("id", answerId)
    newAnswerContainer.setAttribute("class", "new-answer-div")
    document.getElementById("newAnswers").appendChild(newAnswerContainer)

    var newAnswerInput = document.createElement("input")
    newAnswerInput.setAttribute("class", "answer")
    newAnswerInput.setAttribute("type", "text")
    newAnswerInput.setAttribute("name", "answers")
    newAnswerInput.setAttribute("placeholder", "Cevap")
    newAnswerInput.setAttribute("required", "true")
    newAnswerContainer.appendChild(newAnswerInput)

    var newDeleteAnswerButton = document.createElement("div")
    newDeleteAnswerButton.innerHTML = '-'
    newDeleteAnswerButton.setAttribute("class", "delete-answer-button")
    newDeleteAnswerButton.setAttribute("onclick", "deleteAnswer(" + answerId +")")
    newAnswerContainer.appendChild(newDeleteAnswerButton)
}

function randomId() {
    return Math.floor(Math.random() * 10000000).toString()
}

function deleteAnswer(answerId) {
    const answer = document.getElementById(answerId.toString())
    answer.parentNode.removeChild(answer)
    answerCount--
}