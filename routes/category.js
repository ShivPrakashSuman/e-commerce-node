const { Router } = require('express');
const categoryController = require('../controllers/category');
const app = Router();

app.get('/', categoryController.index);
app.post('/store', categoryController.store);
app.post('/update', categoryController.update);
app.get('/delete', categoryController.deleteRow);
app.get('/show', categoryController.show);

module.exports = app; 