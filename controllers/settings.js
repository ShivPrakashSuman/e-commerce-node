const Joi = require("joi");
const settings = require('../modals/settings');

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let data = await settings.findAll();
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
        key: Joi.string().required(),
        value: Joi.string().required(),
        type: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await settings.create(data);  // Insert data with Create Table 
        if (result) {
            resp.status = true;
            resp.message = 'Settings Registered Successfully';
            resp.data = result;
        } else {
            resp.message = 'Not Registered Data';
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
        id: Joi.number().integer().required(),
        user_id: Joi.string().required(),
        key: Joi.string().required(),
        value: Joi.string().required(),
        type: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        console.log('data', data)
        const result = await settings.update({ user_id: data.user_id, key: data.key, value: data.value, type: data.type }, { where: { id: data.id } });
        if (result) {
            resp.status = true;
            resp.message = 'Update Data SuccessFull';
            resp.data = result
        } else {
            resp.message = 'Update Failed';
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
        let result = await settings.destroy({ where: { id: data.id } });
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
        const data = schema.value;
        const result = await settings.findOne({ where: { id: data.id } });
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