const { Router } = require('express');
const inventoryControllers = require('../controllers/inventory');
const app = Router();

app.get('/', inventoryControllers.index);
app.post('/store', inventoryControllers.store);
app.post('/update', inventoryControllers.update);
app.get('/delete', inventoryControllers.deleteRow);
app.get('/show', inventoryControllers.show);

module.exports = app ;