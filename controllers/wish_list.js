const Joi = require("joi");
const wish_list = require('../modals/wish_list');

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let data = await wish_list.findAll();
        let result = JSON.parse(JSON.stringify(data)); 
        resp.status = true;
        resp.message = 'Data Fatch SuccessFull';
        resp.data = result;
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
        product_id: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await wish_list.create(data);  // Insert data with Create Table 
        resp.status = true;
        resp.message = 'Cart Table Registered Successfully';
        resp.data = result;
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
        await wish_list.destroy({ where: { id: data.id } });
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
        const data = schema.value;
        const result = await wish_list.findOne({ where: { id: data.id } });
        resp.status = true;
        resp.message = 'Row Data Fatch SuccessFull';
        resp.data = result;
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}


module.exports = { index, store, deleteRow, show };