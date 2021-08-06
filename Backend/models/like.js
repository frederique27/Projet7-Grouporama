'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
  
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      });
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    likes: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};