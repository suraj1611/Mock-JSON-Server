const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js') (app,fs);

app.listen(PORT, ()=>{
    console.log('Server is runnung.');
})
