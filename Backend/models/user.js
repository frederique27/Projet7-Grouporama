'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // models.User.hasMany(models.Post, { onDelete: "CASCADE", hooks: true });
      // models.User.hasMany(models.Comment, { onDelete: "CASCADE", hooks: true });

      // models.User.hasMany(models.Post,
      //   {foreignKey: 'userId'},
      //   { onDelete: 'cascade' });
      
      // models.User.hasMany(models.Comment,
      //   {foreignKey: 'userId'},//
      //   { onDelete: 'cascade' });

      // models.User.hasMany(models.Like,
      //   {foreignKey: 'userId'},//
      //   { onDelete: 'cascade' });
      // models.User.hasMany(models.Like,
      //   { onDelete: 'cascade' });
      }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePic: DataTypes.STRING,
    isAdmin: { type: DataTypes.BOOLEAN, default: false }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};