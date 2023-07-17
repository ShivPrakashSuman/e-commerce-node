const Joi = require("joi");
const wish_list = require('../modals/wish_list');
const { Op } = require("sequelize");
const pagination  = require("../helper/paginationApi");
const product = require("../modals/product");

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let totalRow = JSON.parse(JSON.stringify(await wish_list.findAll()));
        let pg = await pagination(totalRow, req.query);  // pagination  Api ----
        data = await wish_list.findAll({
            include:[
                {model:product, attributes:['id', 'name', 'price']}
            ],
            limit: pg.limit,
            offset: pg.offset,
            order: [[pg.order_by, pg.order_type]], 
        });
        let result = JSON.parse(JSON.stringify(data));
        if (result) {
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = {
                data: result,
                page: pg.page,
                totalPage: pg.totalPage,
                allwishList: pg.totalRow
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
        if (result) {
            resp.status = true;
            resp.message = 'Cart Table Registered Successfully';
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
        let result = await wish_list.destroy({ where: { id: data.id } });
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
        const result = await wish_list.findOne({ where: { id: data.id } });
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