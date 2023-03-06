console.log("Hello World!");
const timer = document.querySelector('#timer')


let countDown = 59

function timerCountDown(){
for (let i = 0; i < 60; i++){
    setTimeout(() => {
        timer.textContent = `0:${countDown}`
        countDown -= 1
    },i*1000)
    }
}

function newQuestion() {
    setTimeout(() => {
        countDown = 59
        'newFetchRequest()'
        timerCountDown()
    }, 1000)
}

/*
calls newQuestion function after some time after selecting an answer
const answers = document.querySelectorAll('.answers')
for (let j = 0; j < answers.length; j++){
    answers[j].addEventListener('click', newQuestion)
*/

/*
calls newQuestion by clicking the next button
const next = document.querySelector('#next')
next.addEventListener('click', newQuestion)
*/
