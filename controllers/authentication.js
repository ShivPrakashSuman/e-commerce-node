const Joi = require("joi");
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const User = require('../modals/user');
const sendMail = require('../helper/mail');
const config = require('../config/jwt_config');
const { password } = require("../config/db");

const signup = async (req, res) => {
    let resp = { status: false, message: 'Oops Somethimg went wrong?', data: null };
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(4).max(8).required(),
        confirmpassword: Joi.ref('password'),
        mobile : Joi.string().required(),
        date_of_birth: Joi.string().required(),
        gender: Joi.string().required(),
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        const data = schema.value;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(data.password, salt);
        const emailExist = await User.findOne({ where: { email: data.email } });
        if (emailExist) {
            resp.message = 'Email Already Exist';
            resp.data = emailExist;
            return res.json(resp);
        } else {
            let userData = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: hash,
                mobile: data.mobile,
                date_of_birth: data.date_of_birth,
                gender: data.gender,
            }
            const result = await User.create(userData);  // Insert data with Create Table 
            if (result) {
                resp.status = true;
                resp.message = 'User Registered Successfully';
                resp.data = result;
            } else {
                resp.message = 'Not Record Registered';
            }
            return res.json(resp);
        }
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const login = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went worng', data: null };
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(4).max(8).required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let data = schema.value;
        const emailExist = await User.findOne({ where: { email: data.email } });
        if (emailExist) {
            let userData = JSON.parse(JSON.stringify(emailExist));
            if (bcrypt.compareSync(data.password, userData.password)) {
                let token = jsonwebtoken.sign({ userData }, config.JWT_SECRET, { expiresIn: '12hr' });
                resp.status = true;
                resp.message = 'Login SuccessFull';
                resp.data = { user: userData, token: token };
                return res.json(resp);
            } else {
                resp.message = 'Password Not Match';
                return res.json(resp);
            }
        } else {
            resp.message = 'Email not found';
            return res.json(resp);
        }
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const forgot = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went wrong ?', data: null };
    const schema = Joi.object({
        email: Joi.string().trim().email().required()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let data = schema.value;
        if (data.email) {
            const emailExist = await User.findOne({ where: { email: data.email } });
            if (emailExist) {
                let fatchData = JSON.parse(JSON.stringify(emailExist));
                const salt = bcrypt.genSaltSync(10);
                const token = bcrypt.hashSync((fatchData.email), salt);
                const path = 'http://localhost:3003/reset';
                await User.update({ forget_pass_code: token }, { where: { id: fatchData.id } });  // Save Forgot token ----
                await sendMail(fatchData, token, path);
                resp.status = true;
                resp.message = 'Link Send Email Successfull';
                return res.json(resp);
            } else {
                resp.message = 'Email is Incorrect';
                return res.json(resp);
            }
        }
        return res.json(resp);
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

const reset = async (req, res) => {
    let resp = { status: false, message: 'Oops Something went wrong ?', data: null };
    const schema = Joi.object({
        password: Joi.string().min(4).max(8).required(),
        confirmpassword: Joi.ref('password'),
        token: Joi.string()
    }).validate(req.body);
    if (schema.error) {
        resp.message = schema.error.details[0].message;
        return res.json(resp);
    }
    try {
        let data = schema.value;
        const passwordExist = await User.findOne({ where: { forget_pass_code: data.token } });
        let userData = JSON.parse(JSON.stringify(passwordExist));
        if (userData.forget_pass_code == data.token) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync((data.password), salt);
            await User.update({ password: hash }, { where: { id: userData.id } });  // Save Forgot token ----
            resp.status = true;
            resp.message = 'Forget Password Success Full'
            return res.json(resp);
        } else {
            resp.message = 'Token Not Match'
            return res.json(resp);
        }
    } catch (e) {
        console.log('catch error', e);
        return res.json(resp);
    }
}

module.exports = { signup, login, forgot, reset }
