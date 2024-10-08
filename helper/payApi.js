const settings = require('../modals/settings');
const product = require('../modals/product');
const user = require('../modals/user');
const Razorpay = require('razorpay');

const payApi = async (user_id,plan_id) => {
    return new Promise(async (resolve, reject) => {
        let settingData = await getSettings(user_id);  // set login user id 
        let peyData = await paymentData(plan_id);   //  set prodect id 
        let userData = await getLoginUser(user_id); // set login user id 

        var options = {         //  Payment  Options     --------------------------
            "key": settingData.key,
            "amount": peyData.amount + '00',
            "currency": settingData.currency,
            "name": peyData.title,
            "description": peyData.description,
            "prefill": {
                "name": userData.first_name + " " + userData.last_name,
                "email": userData.email,
                "contact": userData.mobile 
            },
            "notes": {
                "address": settingData.address
            },
            "theme": {
                "color": settingData.theme
            }
        }
        resolve(options);
    });
}

const getSettings = (id) => {             //  Setting get  -----------------
    return new Promise(async (resolve, reject) => {
        let getSetting = await settings.findAll({ where: ({ user_id: id }) });
        const result = JSON.parse(JSON.stringify(getSetting));
        let data = {
            currency: result[6].value,
            key: result[5].value,
            theme: result[8].value,
            address: result[7].value
        }
        resolve(data);
    });
}

const paymentData = async (id) => {       //  Plan  get    -----------------
    return new Promise(async (resolve, reject) => {
        let getProduct = await product.findOne({ where: ({ id: id }) });
        const result = JSON.parse(JSON.stringify(getProduct));
        if (result) {
            let amount = result.price;
            let title = result.name;
            let description = result.desc;
            resolve({ amount, title, description });
        } else {
            let amount = id;
            let title = 'All Cart Product';
            let description = 'Thank you Very much for giving us a chance'
            resolve({ amount, title, description });
        }
    });
}

const getLoginUser = async (id) => {      //  Login data   -----------------
    return new Promise(async (resolve, reject) => {
        let userData = await user.findOne({ where: { id: id } });
        const result = JSON.parse(JSON.stringify(userData));
        resolve(result);
    });
}

module.exports = payApi; 