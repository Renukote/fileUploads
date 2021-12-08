const express = require('express');
const connect = require('./configs/db')

const userController = require('./controllers/users.controller');
const galleryController = require('./controllers/gallery.controller')

const app = express();
app.use(express.json());

app.use('/users', userController);
app.use('/gallery', galleryController);

app.listen(2222, async () => {
    await connect();
    console.log("listening to port 2222");
});