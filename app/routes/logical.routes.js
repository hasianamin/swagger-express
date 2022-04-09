module.exports = (app) => {
  const logical = require('../controllers/logical.controller.js');
  const router = require('express').Router();

  router.post('/fibonacci', logical.fibonacci);
  router.post('/longest-string', logical.longestString);
  app.use('/logical', router);
};
