

const questions = document.querySelectorAll('.question')
const answersSelected = document.querySelectorAll('.answerSelected')
const correctAnswers = document.querySelectorAll('.correctAnswer')

userResponse = JSON.parse(localStorage["responseData"])

for (let i = 0; i < questions.length; i++){
    for (let j = 0; j < userResponse.length; j++){
        if (i == j) {
            questions[i].textContent = userResponse[j].question
        }
    }
}

