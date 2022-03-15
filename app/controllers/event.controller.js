const db = require('../models');

const Event = db.event;
const { Op } = db.Sequelize;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.eventName) {
    res.status(400).send({
      message: 'Event name can not be empty!',
    });
    return;
  }
  // Create a Event
  const tutorial = {
    eventName: req.body.eventName,
    date: req.body.date,
    location: req.body.location,
  };
  // Save Event in the database
  Event.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the event.',
      });
    });
};

exports.findAll = (req, res) => {
  const { eventName, limit, offset } = req.query;
  const condition = eventName && {
    eventName: { [Op.iLike]: `%${eventName}%` },
  };
  Event.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving event.',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  Event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find event with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving event with id=${id}`,
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Event.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Event was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Event with id=${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Event.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Event was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Event with id=${id}`,
      });
    });
};
