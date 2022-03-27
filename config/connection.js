//import the Sequalize constructor from the library
const Sequalize = require('sequelize');

require('dotenv').config();


//Create connection to our databse, pass in MySql information for username and password
const sequelize = new Sequalize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;