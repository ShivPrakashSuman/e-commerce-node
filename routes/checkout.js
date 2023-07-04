const { Router } = require('express');
const checkoutController = require('../controllers/checkout');
const app = Router();

app.get('/', checkoutController.index);
app.post('/store', checkoutController.store);
app.get('/delete', checkoutController.deleteRow);
app.get('/show', checkoutController.show);

module.exports = app; 