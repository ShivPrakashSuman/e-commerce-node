const { Router } = require('express');
const settingController = require('../controllers/settings');
const app = Router();

app.get('/', settingController.index);
app.post('/store', settingController.store);
app.post('/update', settingController.update);
app.get('/delete', settingController.deleteRow);
app.get('/show', settingController.show);

module.exports = app; 