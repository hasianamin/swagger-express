// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "root",
//   DB: "event_db",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
module.exports = {
  HOST: 'localhost',
  USER: 'db_admin',
  PASSWORD: 'P@ssw0rd',
  DB: 'db_inventory',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
