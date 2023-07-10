const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const User = db.sequelize.define('User', {
    // Model attributes are defined here
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(255)
    },
    last_name: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255)
    },
    mobile: {
        type: DataTypes.STRING(255)
    },
    date_of_birth: {
        type: DataTypes.STRING(255)
    },
    gender: {
        type: DataTypes.STRING(255)
    },
    forget_pass_code: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'users',         // Forcefully give table name if we need
    freezeTableName: true     // tables will use the same name as the model name  not use plural
});

//This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync().then(() => {
   //console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});


// `sequelize.define` also returns the model
console.log(User === db.sequelize.models.User); // true


module.exports = User;
