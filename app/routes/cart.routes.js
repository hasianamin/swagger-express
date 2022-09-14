module.exports = (app) => {
  const cart = require('../controllers/cart.controller.js');
  const router = require('express').Router();

  router.get('/', cart.findAll);
  router.post('/', cart.create);
  app.use('/cart', router);
};
