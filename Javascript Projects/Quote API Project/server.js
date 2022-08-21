const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Req.1 - Start server on port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// Req.2 - Get random quote
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
})

// Req 3 - get quote
app.get('/api/quotes', (req, res, next) => {
    const apiQuery = req.query.person;
    if (apiQuery === '') {
        res.send({quotes: quotes})
    } else {
        const filterQuote = quotes.filter(element => element.person === req.query.person);
        res.send({quotes: filterQuote})
    }
})

// Req.4 - Post to add new quotes
app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        const newQuote = {quote: req.query.quote, person: req.query.person};
        quotes.push(newQuote);
        res.status(201).send({quote: newQuote})
    } else {
        res.status(404);
    }
})