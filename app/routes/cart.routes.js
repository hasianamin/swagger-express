module.exports = (app) => {
  const cart = require('../controllers/cart.controller.js');
  const router = require('express').Router();

  router.get('/', cart.findAll);
  router.post('/', cart.create);
  router.put('/:cartId', cart.update);
  app.use('/cart', router);
};
