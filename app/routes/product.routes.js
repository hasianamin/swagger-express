module.exports = (app) => {
  const product = require('../controllers/product.controller.js');
  const router = require('express').Router();

  router.post('/', product.create);
  app.use('/product', router);
};
