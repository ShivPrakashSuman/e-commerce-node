const Joi = require("joi");
const productDiscount = require('../modals/discount');

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let data = await productDiscount.findAll();
        let result = JSON.parse(JSON.stringify(data));
        if (result) {
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = data;
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
        name: Joi.string().required(),
        desc: Joi.string().required(),
        discount_percent: Joi.string().required(),
        active: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await productDiscount.create(data);  // Insert data with Create Table 
        if (result) {
            resp.status = true;
            resp.message = 'Discount Registered Successfully';
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
        const result = await productDiscount.update({ name: data.name, desc: data.desc, discount_percent: data.discount_percent, active: data.active }, { where: { id: schema.value.id } });
        if (result) {
            resp.status = true;
            resp.message = 'Update Data SuccessFull';
            resp.data = result
        } else {
            resp.message = 'Update Failed ?';
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
        await productDiscount.destroy({ where: { id: data.id } });
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
        const result = await productDiscount.findOne({ where: { id: data.id } });
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