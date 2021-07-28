'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Post, 
        {foreignKey: 'userId'},
        { onDelete: 'cascade' });
      
      models.User.hasMany(models.Comment,
        { onDelete: 'cascade' });

      models.User.hasMany(models.Like,
        { onDelete: 'cascade' });
      }
  };
  User.init({
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
    profilePic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};