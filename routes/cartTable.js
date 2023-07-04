const { Router } = require('express');
const cateControllers = require('../controllers/cartTable');
const app = Router();

app.get('/', cateControllers.index);
app.post('/store', cateControllers.store);
app.post('/update', cateControllers.update);
app.get('/delete', cateControllers.deleteRow);
app.get('/show', cateControllers.show);

module.exports = app;