const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const productInventory = db.sequelize.define('inventory', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'product_inventory',
    freezeTableName: true
});
productInventory.sync().then(() => {
    //console.log('productInventory table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(productInventory === db.sequelize.models.productInventory); // true


module.exports = productInventory;