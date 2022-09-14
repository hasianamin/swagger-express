module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  });
  Product.associate = (models) => {
    Product.hasMany(models.transaction, { foreignKey: 'productId' });
    Product.hasMany(models.transaction, { foreignKey: 'productId' });
  };
  return Product;
};
