const { Router } = require('express');
const authController = require('../controllers/authentication');
const app = Router();

app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.get('/forgot', authController.forgot);
app.get('/reset', authController.reset);

module.exports = app;