

const questions = document.querySelectorAll('.question')
const answersSelected = document.querySelectorAll('.answerSelected')
const correctAnswers = document.querySelectorAll('.correctAnswer')
const answers = document.querySelectorAll('.answer')
const tags = document.querySelectorAll('.tag')
const score = document.querySelector('#score')

userResponse = JSON.parse(localStorage["responseData"])
userScore = JSON.parse(localStorage["score"])
score.textContent = userScore

for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < userResponse.length; j++) {
        if (i == j) {
            questions[i].textContent = userResponse[j].question
            answersSelected[i].textContent = "You picked: " + userResponse[j].answerSelected
            correctAnswers[i].textContent = "Correct answer: " + userResponse[j].correctAnswer

            if (userResponse[j].answerSelected === userResponse[j].correctAnswer) {
                tags[i].classList.add("correct")
                tags[i].textContent = "Correct"
            }
        }
    }
}

setTimeout(localStorage.clear(),5000)
