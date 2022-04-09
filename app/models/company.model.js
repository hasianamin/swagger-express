module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('company', {
    name: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
  });
  // Company.associate = (models) => {
  //   Company.hasMany(models.transaction, { foreignKey: 'companyId' });
  // };
  return Company;
};
