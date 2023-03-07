
const country = document.querySelector("#country");
const fact = document.querySelector("#funFact");
const question = document.querySelector("#question");
const timer = document.querySelector('#timer');
const button = document.querySelector("button");
const answersDiv = document.querySelector(".answersDiv");

let points = 0;

button.addEventListener("click", newQuestion);

createOptions()
timerCountDown()




async function createOptions() {
    answersDiv.innerHTML = "";
    optionPicked = false;

    const data = await fetch ("http://localhost:4000/questions/random");
    const allData = await data.json();

    country.innerHTML = allData.country;
    document.getElementById("image").src = allData.img;
    question.innerHTML = allData.question;

    const answers = Object.entries(allData.answers);
    shuffle(answers);
    
    answers.forEach(ans => {
        const p = document.createElement('p');
            p.classList.add("answers");
            p.innerText = ans[1];

            if(ans[0] === "right") {
                p.addEventListener("click", () => {
                    if(!optionPicked) {
                        p.classList.add("green");
                        optionPicked = true;
                    }
                })
            } else {
                p.addEventListener("click", () => {
                    if(!optionPicked){
                        p.classList.add("red");
                        optionPicked = true;
                    }
                })
            }

            answersDiv.appendChild(p);
    })
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


let countDown = 59

function timerCountDown() {
    clearTimeout(timerCountDown)
    for (let i = 0; i < 60; i++){
        timerCountDown = setTimeout(() => {
        timer.textContent = `0:${countDown}`
        countDown -= 1
    },i*1000)
    }
}

function newQuestion() {
    setTimeout(() => {
        countDown = 59
        createOptions()
    }, 1000)
    timerCountDown()
}
