// selecting different elements from the DOM
const country = document.querySelector("#country");
const fact = document.querySelector("#funFactContent");
const question = document.querySelector("#question");
const users = document.querySelector("#users");
const button = document.querySelector("#next");
const submitButton = document.querySelector("#submit");
const answersDiv = document.querySelector(".answersDiv");


// event listener to make next button move on to the next question
button.addEventListener("click", createOptions);
// event listener to make submit button store responses as an array in JSON format to local storage and move on to the scores page
submitButton.addEventListener("click", () => {
    localStorage["responseData"] = JSON.stringify(userResponse);
    localStorage["score"] = JSON.stringify(users.innerText);
})

// set up empty array to be populated when the user clicks on answers, set up count variable
let userResponse = [];
let count = 0;

// function to keep track of the amount of questions that have been answered and display the submit button on last question
function countCounter() {
    if(count === 9) {
        button.style.display = "none";
        submitButton.style.display = "inline-block";
    }
}

// initial call for question
createOptions();

// called to create a new question 
async function createOptions() {
    // call function to check the question count and update button option if last question is reached
    countCounter();

    // reset the contents of the multiple choices and the fact, set value of an option being picked to false
    answersDiv.innerHTML = "";
    fact.innerHTML = "";
    optionPicked = false;

    // fetching data from server and assigning it to allData variable
    const data = await fetch ("http://localhost:4000/questions/random");
    const allData = await data.json();

    // setting the country, question and image gotten from server onto the UI
    country.innerHTML = allData.country;
    question.innerHTML = allData.question;
    document.getElementById("image").src = allData.img;

    // putting the answers from the server into an array and shuffling it
    const answers = Object.entries(allData.answers);
    shuffle(answers);
    
    // going through the array of answers and for each one, generating a paragraph element to store that answer  
    answers.forEach(ans => {
        const p = document.createElement('p');
            p.classList.add("answers");
            p.innerText = ans[1];

            // adding event listener to the p tags depending on whether it is right answer or wrong 
            if(ans[0] === "right") {
                p.addEventListener("click", () => {
                    // check if option has already been picked, if not then run 
                    if(!optionPicked) {
                        // make button turn green and set option picked to be true
                        p.classList.add("green");
                        optionPicked = true;
                        // update the score and display the fact, then push the user response data to the user response global array
                        users.innerText = parseInt(users.innerText) + 1000;
                        count += 1;
                        fact.innerText = allData.fact;
                        userResponse.push({
                            question: allData.question,
                            answerSelected: ans[1],
                            correctAnswer: ans[1],
                        });

                    }
                });
            } else {
                p.addEventListener("click", () => {
                    // check if option has already been picked, if not then run 
                    if(!optionPicked){
                        // make button turn red and set option picked to be true
                        p.classList.add("red");
                        optionPicked = true;
                        // update the score and display the fact, then push the user response data to the user response global array
                        if(users.innerText > 0) {
                            users.innerText = parseInt(users.innerText) - 500;
                        }
                        count += 1;
                        fact.innerText = allData.fact;
                        userResponse.push({
                            question: allData.question, 
                            answerSelected: ans[1],
                            correctAnswer: allData.answers.right
                        });
                    }
                });
                
            }
            // append the p element to the answers div in the DOM
            answersDiv.appendChild(p);
    })
}

// function to take in an array and shuffle the order of the contents
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
