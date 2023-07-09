const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const productInventory = db.sequelize.define('product_inventory', {
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
    //console.log('product Inventory table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(productInventory === db.sequelize.models.product_inventory); // true


module.exports = productInventory;


