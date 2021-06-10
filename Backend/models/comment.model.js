'use strict'
const {Model} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class Comment extends Model {
        static associate(models) {
            models.Comment.belongsTo(models.User, {
                foreignKey: {
                  allowNull: false,
                },
              });
              models.Comment.belongsTo(models.Post, {
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
            type: Sequelize.STRING(255),
            allowNull: true
        }
      }, {
        sequelize, 
        modelName: 'Comment',
    });
    return Comment;
  };

