const Joi = require("joi");
const checkout = require('../modals/checkout');

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let data = await checkout.findAll();
        let result = JSON.parse(JSON.stringify(data));
        if (result) {
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
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

const store = async (req, res) => {
    let resp = { status: false, message: 'Oops Somethimg went wrong?', data: null };
    const schema = Joi.object({
        user_id: Joi.string().required(),
        product_id: Joi.string().required(),
        quantity: Joi.string().required(),
        product_amount: Joi.string().required(),
        total_amount: Joi.string().required(),
        discount: Joi.string().required(),
        user_address_id: Joi.string().required(),
        Payment_status: Joi.string().required(),
        payment_procedure: Joi.string().required(),
        delivery_datetime: Joi.string().required(),
        order_date_time: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await checkout.create(data);  // Insert data with Create Table 
        if (result) {
            resp.status = true;
            resp.message = 'checkout Registered Successfully';
            resp.data = result;
        } else {
            resp.message = 'Registered Failed ?';
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
        await checkout.destroy({ where: { id: data.id } });
        resp.status = true;
        resp.message = 'Row Delete SuccessFull!';
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
        const data = await checkout.findOne({ where: { id: schema.value.id } });
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


module.exports = { index, store, deleteRow, show };