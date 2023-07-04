const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const checkout = db.sequelize.define('product', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    product_id: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    product_amount: {
        type: DataTypes.INTEGER
    },
    total_amount: {
        type: DataTypes.INTEGER
    },
    discount: {
        type: DataTypes.INTEGER
    },
    user_address_id: {
        type: Sequelize.TEXT
    },
    Payment_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    payment_procedure: {
        type: DataTypes.STRING(255)
    },
    delivery_datetime: {
        type: DataTypes.STRING(255)
    },
    order_date_time: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'checkout',
    freezeTableName: true
});

checkout.sync().then(() => {
    //console.log('checkout table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(checkout === db.sequelize.models.checkout); // true


module.exports = checkout;