const { Sequelize, DataTypes } = require('sequelize');
const db = require('../helper/db');

const wish_list = db.sequelize.define('wish_list', {
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
    }
}, {
    tableName: "wish_list",
    freezeTableName: true
});
wish_list.sync().then(() => {
    //console.log('wish List Table table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(wish_list === db.sequelize.models.wish_list); // true

module.exports = wish_list ; 
