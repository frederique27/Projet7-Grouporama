module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return User;
};