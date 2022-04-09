module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  //   test: {
  //     username: process.env.TEST_DB_USERNAME,
  //     password: process.env.TEST_DB_PASSWORD,
  //     database: process.env.TEST_DB_NAME,
  //     host: process.env.TEST_DB_HOST,
  //     dialect: 'mysql',
  //   },
  //   production: {
  //     username: process.env.PROD_DB_USERNAME,
  //     password: process.env.PROD_DB_PASSWORD,
  //     database: process.env.PROD_DB_NAME,
  //     host: process.env.PROD_DB_HOST,
  //     dialect: 'mysql',
  //   },
};
