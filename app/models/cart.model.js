module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define('cart', {
    productId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
  });
  Cart.associate = (models) => {
    Cart.belongsTo(models.user, { foreignKey: 'userId' });
    Cart.belongsTo(models.product, { foreignKey: 'productId' });
  };
  return Cart;
};
