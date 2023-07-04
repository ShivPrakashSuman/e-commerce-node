const { Router } = require('express');
const userAddressController = require('../controllers/userAddress ');
const app = Router();

app.get('/', userAddressController.index);
app.post('/store', userAddressController.store);
app.post('/update', userAddressController.update);
app.get('/delete', userAddressController.deleteRow);
app.get('/show', userAddressController.show);

module.exports = app; 