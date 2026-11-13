const { Sequelize } = require('sequelize');

const connection = new Sequelize({
  database:"blog", 
  username:"root", 
  password:"root",
  host: "localhost",
  dialect: "mysql",
  port: 3306
});

module.exports = connection;