const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const userAddress  = db.sequelize.define('userAddress ', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    house_no : {
        type: DataTypes.INTEGER
    },
    floor_no: {
        type: DataTypes.INTEGER
    },
    address: {
        type: DataTypes.STRING(255)
    },
    landmark: {
        type: DataTypes.STRING(255)
    },
    city: {
        type: DataTypes.STRING(255)
    },
    state: {
        type: DataTypes.STRING(255)
    },
    country: {
        type: DataTypes.STRING(255)
    },
    pincode: {
        type: DataTypes.INTEGER
    },
    mobile_no: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'user_address',
    freezeTableName: true
});

userAddress .sync().then(() => {
    //console.log('userAddress  table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(userAddress  === db.sequelize.models.userAddress ); // true


module.exports = userAddress;