const express = require('express');
const verifyToken = require('./helper/verifyToken');
const bodyparser = require('body-parser');
const authRouter = require('./routes/authentication');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const inventorRouter = require('./routes/inventory');
const discountRouter = require('./routes/discount');
const settingRouter = require('./routes/settings');
const cartTableRouter = require('./routes/cartTable');
const wishListRouter = require('./routes/wish_list');
const checkoutRouter = require('./routes/checkout');
const userAddressRouter = require('./routes/userAddress');
const orderListRouter = require('./routes/order_list');
const payApiRouter = require('./routes/payApi');

const cors = require("cors");
const path = require('path');
var app = express();
app.use(verifyToken);
// const corsOrigin ={
//     origin:'http://localhost:4200', //or whatever port your frontend is using
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials:true,            
//     optionSuccessStatus:204
// }
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
app.use('/carttable', cartTableRouter);
app.use('/wishlist', wishListRouter);
app.use('/checkout', checkoutRouter);
app.use('/useraddress', userAddressRouter);
app.use('/orderlist', orderListRouter);
app.use('/payapi', payApiRouter);

app.get('/reset', (_, res) => {
    res.sendFile(`${path.join(__dirname)}/view/reset_page.html`);
});

app.listen(3003, function () {
    console.log("Started application on port", 3003);
})

