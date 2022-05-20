//init
const express = require('express');
const app = express();

const { test, loadmodel } = require('./models/index');

const path = require('path');

test();
loadmodel();

//ROUTES


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');



//il nous donne accer au corps de la requete
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
module.exports = app;