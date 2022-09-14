module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.cart, { foreignKey: 'userId' });
  };
  return User;
};
