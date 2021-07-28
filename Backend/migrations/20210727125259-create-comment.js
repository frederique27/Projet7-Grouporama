'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Comments');
  }
};