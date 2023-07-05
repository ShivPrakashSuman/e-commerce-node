const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const order_list = db.sequelize.define('order_list', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    order_id: {
        type: DataTypes.INTEGER
    },
    date_purchased: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    },
    status: {
        type: DataTypes.STRING(255)
    },
    total: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'order_list',
    freezeTableName: true
});

order_list.sync().then(() => {
    //console.log('order list table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(order_list === db.sequelize.models.order_list); // true


module.exports = order_list;