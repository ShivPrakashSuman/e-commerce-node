const Joi = require("joi");
const userAddress = require('../modals/userAddress ');

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let data = await userAddress.findAll();
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
        house_no: Joi.string().required(),
        floor_no: Joi.string().required(),
        address: Joi.string().required(),
        landmark: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.string().required(),
        mobile_no: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await userAddress.create(data);  // Insert data with Create Table 
        resp.status = true;
        resp.message = 'User Address Registered Successfully';
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
        id: Joi.string().required(),
        user_id: Joi.string().required(),
        house_no: Joi.string().required(),
        floor_no: Joi.string().required(),
        address: Joi.string().required(),
        landmark: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.string().required(),
        mobile_no: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await userAddress.update({ user_id: data.user_id, house_no: data.house_no, floor_no: data.floor_no, address: data.address, landmark: data.landmark,
                         city: data.city, state: data.state, pincode: data.pincode, mobile_no:data.mobile_no  }, { where: { id: data.id } });
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
        await userAddress.destroy({ where: { id: data.id } });
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
        const data = await userAddress.findOne({ where: { id: schema.value.id } });
        const result = JSON.parse(JSON.stringify(data));
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