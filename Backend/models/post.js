'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // models.Post.hasMany(models.Comment, { onDelete: "CASCADE", hooks: true });

      // models.Post.belongsTo(models.User, {
      //   foreignKey: {
      //     allowNull: false,
      //   },
      // });
      models.Post.belongsTo(models.User, 
        { foreignKey: 'userId' },
        { onDelete: 'cascade' } //
      );

      models.Post.hasMany(models.Comment,
        { foreignKey: 'postId' },
        { onDelete: 'cascade' });
      
      // models.Post.hasMany(models.Like,
      //   { foreignKey: 'postId' },
      //   { onDelete: 'cascade' });
    }
  };
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull:     false,
      primaryKey:    true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    textPost: {
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