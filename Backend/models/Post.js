const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    title: Sequelize.STRING,
    content: Sequelize.STRING
});

module.exports = User;