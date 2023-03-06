// import cors and express server as well as the questions.json file holding all the questions 
const cors = require('cors');
const express = require('express');
const questions = require('./questions.json');

// initialise app as the express server
const app = express();

// make the server use cors and express' JSON compatibility
app.use(cors());
app.use(express.json());


// Home route
app.get('/', async (req, res) => {
    res.status(200).send('Hello, History Guessr!');
})

// questions route which returns the array holding all the questions from the questions.json file
app.get('/questions', async (req, res, next) => {
    // check to see if the questions file or array exists, if it does then send the whole array
    if(!questions || !questions.length) {
        res.status(404).send();
    } else {
        res.status(200).send(questions);
    }

    next();
})


let questionAnswered = [];
// route to get a random question from the array of questions
app.get('/questions/random', async (req, res, next) => {
    // assigning a random number in the range of the number of elements in the questions array
    let number = Math.floor(Math.random() * questions.length);
    let exists = true;

    // if the array of answered questions is the same as the questions array then all questions have been tried, reset the answered questions array and start over
    if(questionAnswered.length === questions.length) {
        questionAnswered = [];
    }

    // if the questions array doesn't exist or there are no questions in the array then send an error
    if(!questions || !questions.length) {
        res.status(404).send();
    }

    // if there is nothing in the answered questions array, skip the while loop and move on
    if(!questionAnswered.length) {
        exists = false;
    }
    
    // while loop that checks to see if the question has already been sent recently, if so then get a new question then check again
    while(exists) {
        // if the id of the currrent question trying to be sent is in the answered array, change which question is trying to be sent and check again
        if(questionAnswered.includes(questions[number].id)) {
            number = Math.floor(Math.random() * questions.length); 
        } else {
            exists = false;
        }
    }

    // send the question to the client and add the id to the answered array for checks when GET request is called again
    questionAnswered.push(questions[number].id);
    res.status(200).send(questions[number]);
    next();
})

module.exports = app;
