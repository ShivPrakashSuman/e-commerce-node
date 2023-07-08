const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");
const product = require('./product.js');

const cartTable = db.sequelize.define('cartTable', {
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
cartTable.belongsTo(product, {foreignKey: 'product_id'});

cartTable.sync().then(() => {
    //console.log('Cart Table table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(cartTable === db.sequelize.models.cartTable); // true


module.exports = cartTable;