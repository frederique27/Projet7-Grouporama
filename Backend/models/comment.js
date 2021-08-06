'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
  
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
        
      })
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    textComment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le contenu du post ne peut pas être vide',
        },
        notEmpty: {
          msg: 'Le contenu du post ne peut pas être vide',
        },
        isValidLength(content) {
          if (content.length > 200) {
            throw new Error('Le contenu du post peut contenir au maximum 200 caractères');
          }
        },
    }
  }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};