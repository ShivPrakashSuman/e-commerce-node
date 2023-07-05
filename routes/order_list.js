const { Router } = require('express');
const orderController = require('../controllers/order_list');
const app = Router();

app.get('/', orderController.index);
app.post('/store', orderController.store);
app.get('/delete', orderController.deleteRow);
app.get('/show', orderController.show);

module.exports = app; 