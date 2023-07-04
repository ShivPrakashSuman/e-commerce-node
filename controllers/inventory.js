const Joi = require("joi");
const productInventory = require('../modals/inventory');

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let data = await productInventory.findAll();
        let result = JSON.parse(JSON.stringify(data));   //  USE IT OR NOT SIR ----------------------
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
        quantity: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await productInventory.create(data);  // Insert data with Create Table 
        resp.status = true;
        resp.message = 'Inventory Registered Successfully';
        resp.data = result;
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
        const data = res.body;
        const result = await productInventory.update({ quantity: data.quantity }, { where: { id: schema.id } });
        resp.status = true;
        resp.message = 'Update Data SuccessFull';
        resp.data = result
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
        await productInventory.destroy({ where: { id: data.id } });
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
        const result = await productInventory.findOne({ where: { id: data.id } });
        resp.status = true;
        resp.message = 'Row Data Fatch SuccessFull';
        resp.data = result;
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}


module.exports = { index, store, update, deleteRow, show };