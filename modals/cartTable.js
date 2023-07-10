
const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");
const product = require('./product.js');

const cart_table = db.sequelize.define('cart_table', {
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
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'cart_table',
    freezeTableName: true
});

cart_table.belongsTo(product, {foreignKey: 'product_id'});

cart_table.sync().then(() => {
    //console.log('cart_table table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(cart_table === db.sequelize.models.cart_table); // true


module.exports = cart_table;