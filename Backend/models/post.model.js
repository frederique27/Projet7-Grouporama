module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // ownerId: { 
        //     type: Sequelize.INTEGER,
        //     allowNull: false
        //  },
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
        },
    });
    return Post;
  };