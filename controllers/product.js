const Joi = require("joi");
const product = require('../modals/product');
const productCategory = require('../modals/productCategory');
const productInventory = require('../modals/inventory');
const productDiscount = require('../modals/discount');
const { Op } = require("sequelize");
const pagination  = require("../helper/paginationApi");

const index = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    try {
        let totalRow = JSON.parse(JSON.stringify(await product.findAll()));
        let pg = await pagination (totalRow, req.query);  // pagination  Api ----

        let rows = await product.findAll({
            include    : [
                { model: productCategory,
                    attributes:['id', 'name', 'desc']
                },
                { model: productInventory },
                { model: productDiscount }
            ],
            where: {
                [Op.or]: [
                    { 'id': { [Op.like]: '%' + pg.search + '%' } },
                    { 'name': { [Op.like]: '%' + pg.search + '%' } },
                    { 'sku': { [Op.like]: '%' + pg.search + '%' } },
                    { 'price': { [Op.like]: '%' + pg.search + '%' } }
                ]
            },
            limit: pg.limit,
            offset: pg.offset,
            order: [[pg.order_by, pg.order_type]],
        })
        let result = JSON.parse(JSON.stringify(rows));
        if (result) {
            resp.status = true;
            resp.message = 'Data Fatch SuccessFull';
            resp.data = {
                data: result,
                page: pg.page,
                totalPage: pg.totalPage,
                allProduct: pg.totalRow
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
        name: Joi.string().required(),
        desc: Joi.string().required(),
        sku: Joi.string().required(),
        price: Joi.string().required(),
        category_id: Joi.string().required(),
        inventory_id: Joi.string().required(),
        discount_id: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        const result = await product.create(data);  // Insert data with Create Table 
        if (result) {
            resp.status = true;
            resp.message = 'Product Registered Successfully';
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
        name: Joi.string().required(),
        desc: Joi.string().required(),
        sku: Joi.string().required(),
        price: Joi.string().required(),
        category_id: Joi.string().required(),
        inventory_id: Joi.string().required(),
        discount_id: Joi.string().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    console.log('')
    try {
        const data = schema.value;
        const result = await product.update({ name: data.name, desc: data.desc, sku: data.sku, price: data.price, category_id: data.category_id, inventory_id: data.inventory_id, discount_id: data.discount_id }, { where: { id: data.id } });
        if (result) {
            resp.status = true;
            resp.message = 'Update Data SuccessFull';
            resp.data = result
        } else {
            resp.message = 'Data Not Update';
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
        let result = await product.destroy({ where: { id: data.id } });
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
        const result = await product.findOne({ 
            include    : [
                { model: productCategory,attributes:['name', 'desc'] },
                { model: productDiscount, attributes:['name', 'desc', 'discount_percent'] },
                { model: productInventory }
            ],
            where: { id: data.id } 
        });
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