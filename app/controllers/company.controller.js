const db = require('../models');

const Company = db.company;
const { Op } = db.Sequelize;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.code) {
    res.status(400).send({
      message: 'data can not be empty!',
    });
    return;
  }

  const newData = {
    name: req.body.name,
    code: req.body.code,
  };

  Company.create(newData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the event.',
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const data = await Company.findAll();
    res.send({ data });
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the event.',
    });
  }
};
