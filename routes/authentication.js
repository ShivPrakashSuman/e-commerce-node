const { Router } = require('express');
const authController = require('../controllers/authentication');
const app = Router();

app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/forgot', authController.forgot);
app.post('/reset', authController.reset);

module.exports = app;