'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        } 
      },
      photo: {
        type: Sequelize.STRING
      },
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
      },
      likes: {
        type: Sequelize.INTEGER
      },
      dislikes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};