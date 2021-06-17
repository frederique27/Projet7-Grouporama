'use strict'
const {Model} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class Comment extends Model {
        static associate(models) {
            models.Comment.belongsTo(models.User, {
              foreignKey: 'userId',
                foreignKey: {
                  allowNull: false,
                },
              });
              models.Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                foreignKey: {
                  allowNull: false,
                },
              });
        }
    }
      Comment.init ({
        id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: { 
            type: Sequelize.INTEGER(11).UNSIGNED,
         },
        postId: { 
            type: Sequelize.INTEGER(11).UNSIGNED,
         },
        textComment: {
            type: Sequelize.TEXT,
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

