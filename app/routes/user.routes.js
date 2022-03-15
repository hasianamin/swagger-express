module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  const router = require('express').Router();

  router.post('/', user.register);
  router.get('/', user.login);
  app.use('/user', router);
};
