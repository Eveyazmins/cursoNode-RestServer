require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/* Middleware para procesar peticiones con parametros urlencoded */

app.use(bodyParser.urlencoded({ extended: false }));

/* Middleware para transformar todas las peticiones en JSON */

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});