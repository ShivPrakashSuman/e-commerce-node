const { Router } = require('express');
const discountController = require('../controllers/discount');
const app = Router();

app.get('/', discountController.index);
app.post('/store', discountController.store);
app.post('/update', discountController.update);
app.get('/delete', discountController.deleteRow);
app.get('/show', discountController.show);

module.exports = app; 