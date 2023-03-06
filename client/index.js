console.log("Hello World!");
const timer = document.querySelector('#timer')

let countDown = 59

const timerCountDown = () => {
for (let i = 0; i < 60; i++){
    setTimeout(() => {
        timer.textContent = `0:${countDown}`
        countDown -= 1
    },i*1000)
}
}

