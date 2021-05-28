'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  // const User = sequelize.define('users', {
    // const User = sequelize.define('User', {
    class User extends Model {
      static associate(models) {
        models.User.hasMany(models.Post,
          {onDelete: 'cascade' });
        }
      };
      User.init ({
    id: {
      // allowNull: false,
      type: Sequelize.INTEGER(11).UNSIGNED,
       primaryKey:    true,
       autoIncrement: true
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
