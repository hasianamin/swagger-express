module.exports = (app) => {
  const transaction = require('../controllers/transaction.controller.js');
  const router = require('express').Router();

  router.post('/', transaction.create);
  router.get('/print', transaction.print);
  app.use('/transaction', router);
};
