function applyExtraSetup(sequelize) {
  const { transaction, product, company } = sequelize.models;

  product.hasMany(transaction);
  transaction.belongsTo(product);

  company.hasMany(transaction);
  transaction.belongsTo(company);
}

module.exports = { applyExtraSetup };
