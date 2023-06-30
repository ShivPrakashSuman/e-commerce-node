const { Sequelize, DataTypes } = require('sequelize');
const db = require("../helper/db.js");

const settings = db.sequelize.define('settings', {
    id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED
    },
    Key: {
        type: DataTypes.STRING(255)
    },
    value: {
        type: DataTypes.STRING(255)
    },
    type: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'settings',    
    freezeTableName: true     
});
//This creates the table if it doesn't exist (and does nothing if it already exists)
settings.sync().then(() => {
   //console.log('Setting table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
console.log(settings === db.sequelize.models.settings); // true


module.exports = settings;
