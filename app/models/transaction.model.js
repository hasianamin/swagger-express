module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define('transaction', {
    productId: {
      type: Sequelize.INTEGER,
    },
    companyId: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
  });
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.company, { foreignKey: 'companyId' });
    Transaction.belongsTo(models.product, { foreignKey: 'productId' });
  };
  return Transaction;
};
