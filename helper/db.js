const config = require("../config/db");
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
  const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: config.dialect
  });


  sequelize.authenticate().then(() => {
     // console.log('Connection has been established successfully.');
  }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
  });

  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  module.exports = db;