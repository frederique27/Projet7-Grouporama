'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User, 
        { foreignKey: 'userId' }
      );
      models.Post.hasMany(models.Comment,
        { onDelete: 'cascade' });
      
      models.Post.hasMany(models.Like,
        { onDelete: 'cascade' });
    }
  };
  Post.init({
    userId: DataTypes.STRING,
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
    },
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};