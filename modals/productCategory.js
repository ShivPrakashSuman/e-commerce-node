const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const productCategory = db.sequelize.define('productCategory', {
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
        type:Sequelize.TEXT
    }
}, {
    tableName: 'product_category',    
    freezeTableName: true     
});
//This creates the table if it doesn't exist (and does nothing if it already exists)
productCategory.sync().then(() => {
   //console.log('product Category table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
//console.log(productCategory === db.sequelize.models.productCategory); // true


module.exports = productCategory;