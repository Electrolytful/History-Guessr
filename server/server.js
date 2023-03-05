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

// route to get a random question from the array of questions
app.get('/questions/random', async (req, res, next) => {
    // assigning a random number in the range of the number of elements in the questions array
    let number = Math.floor(Math.random() * questions.length);

    if(!questions || !questions.length) {
        res.status(404).send();
    } else {
        res.status(200).send(questions[number]);
    }

    next();
})

module.exports = app;
