const express = require('express');
const bodyparser = require('body-parser');
const authRouter = require('./routes/authentication');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const cors = require("cors");
const path = require('path');

var app = express();

app.use(cors());
//convert body data to json for nodejs controller
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use('/authentication', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.get('/reset', (_, res) => {
    res.sendFile(`${path.join(__dirname)}/reset_page.html`);
});

app.listen(3003, function () {
    console.log("Started application on port", 3003);
})

