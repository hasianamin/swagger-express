module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  const router = require('express').Router();

  router.post('/register', user.register);
  router.post('/login', user.login);
  app.use('/user', router);
};
