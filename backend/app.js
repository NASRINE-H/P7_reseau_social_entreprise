const express = require('express');
const app = express();

const { test, loadmodel } = require('./models/index');

const path = require('path');
//const auth = require("./middelware/auth");


test();
loadmodel();

//ROUTES
app.use(express.json());

//const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');



//il nous donne acces au corps de la requete
//app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.use((req, res, next) => console.log(req.body));

app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use("/api/auth  ", authRoutes)
//routes
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
module.exports = app;