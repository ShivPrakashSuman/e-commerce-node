
const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const user_address = db.sequelize.define('user_address', {
    // Model attributes are defined here
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    house_no: {
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
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'user_address',
    freezeTableName: true
});

user_address.sync().then(() => {
    //console.log('user_address table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', user_address);
});

// `sequelize.define` also returns the model
console.log(user_address === db.sequelize.models.user_address); // true


module.exports = user_address;
