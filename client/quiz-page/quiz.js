
const country = document.querySelector("#country");
const fact = document.querySelector("#funFactContent");
const question = document.querySelector("#question");
const users = document.querySelector("#users");
const button = document.querySelector("#next");
const submitButton = document.querySelector("#submit");
const answersDiv = document.querySelector(".answersDiv");

let count = 0;

createOptions();

button.addEventListener("click", createOptions);
submitButton.addEventListener("click", () => {
    localStorage["responseData"] = JSON.stringify(userResponse)
})

let userResponse = [];

function countCounter() {
    if(count === 9) {
        button.style.display = "none";
        submitButton.style.display = "inline-block";
    }
}

async function createOptions() {
    countCounter();
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
                        users.innerText = parseInt(users.innerText) + 1000;
                        count += 1;
                        fact.innerText = allData.fact;
                        userResponse.push({
                            question: allData.question,
                            answerSelected: ans[1],
                            correctAnswer: ans[1],
                        })

                    }
                })
            } else {
                p.addEventListener("click", () => {
                    if(!optionPicked){
                        p.classList.add("red");
                        optionPicked = true;
                        if(users.innerText > 0) {
                            users.innerText = parseInt(users.innerText) - 500;
                        }
                        count += 1;
                        fact.innerText = allData.fact;
                        userResponse.push({
                            question: allData.question, 
                            answerSelected: ans[1],
                            correctAnswer: allData.answers.right
                        })
                    }
                })
                
            }

            answersDiv.appendChild(p);
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
const submit = document.querySelector('#submit')

localStorage["responseData"] = JSON.stringify(userResponse)
