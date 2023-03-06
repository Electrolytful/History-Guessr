console.log("Hello World!");
const timer = document.querySelector('#timer')
const answers = document.querySelectorAll('.answers')

let countDown = 59

function timerCountDown(){
for (let i = 0; i < 60; i++){
    setTimeout(() => {
        timer.textContent = `0:${countDown}`
        countDown -= 1
    },i*1000)
}
}

for (let j = 0; j < answers.length; j++){
    answers[j].addEventListener('click', newQuestion)
}

function newQuestion() {
    setTimeout(() => {
        countDown = 59
        'newFetchRequest()'
        timerCountDown()
    }, 1000)
}