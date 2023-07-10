const { Router } = require('express');
const payApiControllers = require('../controllers/peyApi');
const app = Router();

app.get('/', payApiControllers.subscription);

module.exports = app;