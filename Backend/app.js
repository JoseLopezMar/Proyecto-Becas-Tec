const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const becasRutes = require('./routes/rutas');
const path = require('path')

mongoose.connect(
    'mongodb+srv://Admin:7JbxApvWK986lneK@cluster0.2ykui5j.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('\n¡Base de datos conectada!\n');
    })
    .catch(() => {
        console.log('\nConexión fallida\n');
    });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("Backend/images")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
                  'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 
                  'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    next();
});

app.use('/api.becas', becasRutes);

module.exports = app;
