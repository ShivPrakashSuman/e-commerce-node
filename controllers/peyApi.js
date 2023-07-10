const Joi = require('joi');
const payApi = require('../helper/payApi');

const subscription = async (req, res) => {
    let resp = { status: false, message: 'Oops Somethimg went wrong?', data: null };
    const Schema = Joi.object({
        id: Joi.string().required()
    }).validate(req.body);

    try {
        let loginUser = 1;
        let result = await payApi(loginUser, Schema.value.id);
        if (result) {
            resp.status = true;
            resp.message = 'Successfull';
            resp.data = result;
        } else {
            resp.message = 'Failed';
        }
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

module.exports = { subscription }; 