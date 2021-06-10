"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.Like.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Like.init(
    {
      id: {type: Sequelize.INTEGER, 
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,},
      userId: {type: Sequelize.INTEGER},
      postId: {type: Sequelize.INTEGER},
      likes: {type: Sequelize.INTEGER,
              defaultValue: 0}
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};