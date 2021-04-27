const Sequelize  = require('sequelize');

let DBPassword = process.env.DBPASSWORD;
const sequelize = new Sequelize('groupomania', 'root', DBPassword, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize; 