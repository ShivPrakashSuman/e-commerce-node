const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");
const productCategory = require('./productCategory.js');
const productInventory = require('./inventory.js');
const productDiscount = require('./discount.js');

const product = db.sequelize.define('product', {
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
    sku: {
        type: DataTypes.STRING(255)
    },
    price: {
        type: DataTypes.STRING(255)
    },
    category_id: {
        type: DataTypes.INTEGER
    },
    inventory_id: {
        type: DataTypes.INTEGER
    },
    discount_id: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'product',
    freezeTableName: true
});

// //  JOIN Tables ----
// product.belongsTo(productCategory, { foreignKey: 'category_id' });
// product.belongsTo(productInventory, { foreignKey: 'inventory_id' });
// product.belongsTo(productDiscount, { foreignKey: 'discount_id' });

product.sync().then(() => {
    //console.log('product table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(product === db.sequelize.models.product); // true


module.exports = product;