const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());


// Home route
app.get('/', async (req, res, next) => {
    res.status(200).send('Hello, History Guessr!');
})

module.exports = app;
