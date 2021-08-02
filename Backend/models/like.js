'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // models.Like.belongsTo(models.User, {
      //   foreignKey: {
      //     allowNull: false,
      //   },
      // });
      // models.Like.belongsTo(models.Post, {
      //   foreignKey: {
      //     allowNull: false,
      //   },
      // });

      
      // models.User.belongsToMany(models.Post, {
      //   through: models.Like,
      //   foreignKey: 'userId',
      //   otherKey: 'postId',
      // });
  
      // models.Post.belongsToMany(models.User, {
      //   through: models.Like,
      //   foreignKey: 'postId',
      //   otherKey: 'userId',
      // });
  
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