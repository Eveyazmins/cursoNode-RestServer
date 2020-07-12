require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const routes = require('./routes/index');
const mongoose = require('mongoose');
const URI = 'mongodb://admin:admin1234@ds245772.mlab.com:45772/cursonode-restserver';


/* Middleware para procesar peticiones con parametros urlencoded */

app.use(bodyParser.urlencoded({ extended: false }));

/* Middleware para transformar todas las peticiones en JSON */

app.use(bodyParser.json());

/* Middleware - Configuración global de rutas */
app.use(require('./routes/index'));


mongoose.connect(URI).then(db => console.log('db is connected')).catch(error => console.log(error));


app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});