
const country = document.querySelector("#country");
const fact = document.querySelector("#funFactContent");
const question = document.querySelector("#question");
const timer = document.querySelector('#timer');
const users = document.querySelector("#users");
const button = document.querySelector("button");
const answersDiv = document.querySelector(".answersDiv");

let points = 0;

button.addEventListener("click", newQuestion);

createOptions()
timerCountDown()



async function createOptions() {
    answersDiv.innerHTML = "";
    fact.innerHTML = "";
    optionPicked = false;

    const data = await fetch ("http://localhost:4000/questions/random");
    const allData = await data.json();

    country.innerHTML = allData.country;
    question.innerHTML = allData.question;
    document.getElementById("image").src = allData.img;

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
                        users.innerText++;
                        fact.innerText = allData.fact;
                    }
                })
            } else {
                p.addEventListener("click", () => {
                    if(!optionPicked){
                        p.classList.add("red");
                        optionPicked = true;
                        users.innerText--;
                        fact.innerText = allData.fact;
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
    for (let i = 0; i < 6000; i++){
            timerCountDown = setTimeout(() => {
                timer.textContent = `0:${countDown}`
                countDown -= 1
                }, i * 1000)
    }
}

function newQuestion() {
    setTimeout(() => {
        countDown = 59
        createOptions()
    }, 1000)
    timerCountDown()
}
