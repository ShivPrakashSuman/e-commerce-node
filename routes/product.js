const { Router } = require('express');
const productControllers = require('../controllers/product');
const app = Router();

app.get('/', productControllers.index);
app.post('/store', productControllers.store);
app.post('/update', productControllers.update);
app.get('/delete', productControllers.deleteRow);
app.get('/show', productControllers.show);

module.exports = app;