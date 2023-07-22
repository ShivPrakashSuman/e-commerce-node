const Joi = require("joi");
const cart_table = require('../modals/cartTable');
const product = require("../modals/product");

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let data = await cart_table.findAll({
            include: [
                { model: product, attributes:['id', 'name', 'desc', 'price']}
            ]
        });
        let result = JSON.parse(JSON.stringify(data));

        var array = new Array();
        for (var i=0; i < result.length; i++){
             let price = result[i].product.price;
             let quantity = result[i].quantity;
             array.push({'price':price, 'quantity':quantity});
            }
        
        if (result) {
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = {
                data: result,
                totalRecord: await quantityMultiplySum(array)
            };
        } else {
            resp.message = 'Not Record Found';
        }
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}
const quantityMultiplySum = (obj) => {             //  product quantity Multiply price  -----------------
    return new Promise(async (resolve, reject) => {
        var multiply = new Array();
        for( var el in obj ) {
            multiply.push((obj[el].price)*(obj[el].quantity));
        }
        let data = {
            multiply: multiply,
            priceSum: await productPriceSum(multiply)
        }
        resolve(data);
    });
}

const productPriceSum = (obj) => {             //  product price sum  -----------------
    return new Promise(async (resolve, reject) => {
        var sum = 0;
        for( var el in obj ) {
            if( obj.hasOwnProperty( el ) ) {
                sum += parseFloat( obj[el] );
            }
        }
        resolve(sum);
    });
}

const store = async (req, res) => {
    let resp = { status: false, message: 'Oops Somethimg went wrong?', data: null };
    const schema = Joi.object({
        user_id: Joi.string().required(),
        product_id: Joi.string().required(),
        quantity: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await cart_table.create(data);  // Insert data with Create Table 
        if (result) {
            resp.status = true;
            resp.message = 'Cart Table Registered Successfully';
            resp.data = result;
        } else {
            resp.message = 'Not Record Registered';
        }
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const update = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = req.body;
        const result = await cart_table.update({ user_id: data.user_id, product_id: data.product_id, quantity: data.quantity }, { where: { id: schema.value.id } });
        if (result) {
            resp.status = true;
            resp.message = 'Update Data SuccessFull';
            resp.data = result
        } else {
            resp.message = 'Not Record Updated';
        }
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const deleteRow = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        let result = await cart_table.destroy({ where: { id: data.id } });
        if (result) {
            resp.status = true;
            resp.message = 'Row Delete SuccessFull!';
        } else {
            resp.message = 'Id Note Found';
        }
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const show = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    const schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.query);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = await cart_table.findOne({ where: { id: schema.value.id } });
        const result = JSON.parse(JSON.stringify(data));
        if (result) {
            resp.status = true;
            resp.message = 'Row Data Fatch SuccessFull';
            resp.data = result;
        } else {
            resp.message = 'Not Record Found';
        }
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}


module.exports = { index, store, update, deleteRow, show };