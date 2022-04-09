module.exports = (app) => {
  const company = require('../controllers/company.controller.js');
  const router = require('express').Router();

  router.post('/', company.create);
  router.get('/', company.findAll);
  app.use('/company', router);
};
