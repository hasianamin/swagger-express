module.exports = (app) => {
  const transaction = require('../controllers/transaction.controller.js');
  const router = require('express').Router();

  router.post('/', transaction.create);
  router.get('/', transaction.findAll);
  router.get('/print', transaction.print);
  router.post('/scheduler', transaction.createScheduler);
  app.use('/transaction', router);
};
