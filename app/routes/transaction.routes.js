module.exports = (app) => {
  const transaction = require('../controllers/transaction.controller.js');
  const router = require('express').Router();

  router.post('/', transaction.create);
  app.use('/transaction', router);
};
