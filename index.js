const express = require('express');
const bodyparser = require('body-parser');
const authRouter = require('./routes/authentication');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const inventorRouter = require('./routes/inventory');
const discountRouter = require('./routes/discount');
const settingRouter = require('./routes/settings');

const cors = require("cors");
const path = require('path');
var app = express();
app.use(cors());

//convert body data to json for nodejs controller
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/authentication', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/inventory', inventorRouter);
app.use('/discount', discountRouter);
app.use('/setting', settingRouter);

app.get('/reset', (_, res) => {
    res.sendFile(`${path.join(__dirname)}/reset_page.html`);
});

app.listen(3003, function () {
    console.log("Started application on port", 3003);
})

