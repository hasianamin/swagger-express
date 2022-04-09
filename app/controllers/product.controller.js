const db = require('../models');

const Product = db.product;
const { Op } = db.Sequelize;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: 'data can not be empty!',
    });
    return;
  }

  const newData = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  Product.create(newData)
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
    const data = await Product.findAll();
    res.send({ data });
  } catch (error) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the event.',
    });
  }
};
