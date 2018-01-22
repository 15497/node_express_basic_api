// we halen express binnen. Hiermee kunnen we REST api's makkelijk aanmaken.
const express = require('express');

// vervolgens maken we een instantie aan van express zodat we een webserver hebben
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// we regelen onze routes
app.get('/', (req, res) => res.send('Dit is onze REST API'));

// we zeggen dat onze app moet luisteren op poort 3000
app.listen(3000, () => console.log('Example app listening on port 3000!'));