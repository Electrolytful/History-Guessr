
const country = document.querySelector("#country");
const fact = document.querySelector("#funFact");
const question = document.querySelector("#question");
//const answerSelection = document.querySelectorAll(".answers");
const answer1 = document.querySelector("#first");
const answer2 = document.querySelector("#second");
const answer3 = document.querySelector("#third");
const answer4 = document.querySelector("#fourth");
const answer5 = document.querySelector("#fifth");
const button = document.querySelector("button")

let points = 0;

//answerSelection.addEventListener("click", checkAnswer);
button.addEventListener("submit", nextQuestion);

async function createOptions() {
    const data = await fetch ("http://localhost:4000/questions/random");
    const allData = await data.json();

    country.innerHTML = allData.country;

    document.getElementById("image").src = allData.img;

    question.innerHTML = allData.question;

    answer1.innerHTML = allData.answers.right;
    //console.log(allData.answers.right)
    answer2.innerHTML = allData.answers.wrong1;
    answer3.innerHTML = allData.answers.wrong2;
    answer4.innerHTML = allData.answers.wrong3;
    answer5.innerHTML = allData.answers.wrong4;
}

createOptions()


async function checkAnswer(e) {
    // find correct answer in database
    const data = await fetch ("http://localhost:4000/questions/random");
    const allData = await data.json();
    const correctAnswer = allData.answers.right;
    let response = e.target.answerSelection.answer1;

    //if(correctAnswer === response) {

    

    
    
    
    
    
    //console.log(correctAnswer);



    // console.log(correctAnswer)

    // specify chosen answer by user

    // compare user vs database


    // if correct, change to green



    //show fact section



}

//checkAnswer();



async function nextQuestion() {

    console.log('yay it works')

    
}


