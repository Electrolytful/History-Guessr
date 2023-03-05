const cors = require('cors');
const express = require('express');
const questions = require('./questions.json');

const app = express();

app.use(cors());
app.use(express.json());


// Home route
app.get('/', async (req, res) => {
    res.status(200).send('Hello, History Guessr!');
})

app.get('/questions', async (req, res, next) => {
    if(!questions.length) {
        res.status().send();
    } else {
        res.status().send(questions);
    }
})

app.get('/questions/random', async (req, res, next) => {
    
})

module.exports = app;
