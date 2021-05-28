'use strict'
const {Model} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    // const Post = sequelize.define('posts', {
      class Post extends Model {
        static associate(models) {
          models.Post.belongsTo(models.User, {
            // foreignKey: 'userId',
            // onDelete: 'CASCADE',
            // foreignKey: {
            //   allowNull: false
            // }
          });
        }
      };
      Post.init ({
          id: {
            type: Sequelize.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: { 
            // type: Sequelize.INTEGER(11).UNSIGNED,
            type: Sequelize.STRING,
            // allowNull: false
         },
        photo: { type: Sequelize.STRING },
        textPost: { 
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
                  if (content.length > 2000) {
                    throw new Error('Le contenu du post peut contenir au maximum 2000 caractères');
                  }
                },
            }
        }
      }, {
        sequelize, 
        modelName: 'Post',
    });
    return Post;
  };

