const { Sequelize, DataTypes } = require('sequelize');
const db = require('../helper/db');

const productDiscount = db.sequelize.define('productDiscount', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255)
    },
    desc: {
        type: Sequelize.TEXT
    },
    discount_percent: {
        type: DataTypes.STRING(255)
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'product_discount',
    freezeTableName: true
});
productDiscount.sync().then(() => {
   // console.log('product Discount table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(productDiscount === db.sequelize.models.productDiscount); // true


module.exports = productDiscount;