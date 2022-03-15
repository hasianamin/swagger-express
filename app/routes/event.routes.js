const { auth } = require('./../helpers/auth');

module.exports = (app) => {
  const events = require('../controllers/event.controller.js');
  const router = require('express').Router();

  router.post('/', auth, events.create);
  router.get('/', events.findAll);
  router.get('/:id', events.findOne);
  router.put('/:id', auth, events.update);
  router.delete('/:id', auth, events.delete);
  app.use('/events', router);
};
