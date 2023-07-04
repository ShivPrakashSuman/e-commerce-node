const { Router } = require('express');
const wishController = require('../controllers/wish_list');
const app = Router();

app.get('/', wishController.index);
app.post('/store', wishController.store);
app.get('/delete', wishController.deleteRow);
app.get('/show', wishController.show);

module.exports = app; 