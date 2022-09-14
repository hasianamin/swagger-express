const db = require('../models');

const Cart = db.cart;
const { Op } = db.Sequelize;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId || !req.body.productId) {
    res.status(400).send({
      message: 'data can not be empty!',
    });
    return;
  }

  const newData = {
    productId: req.body.productId,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  Cart.create(newData)
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
    const data = await Cart.findAll({
      include: ['product', 'user'],
    });
    res.send({ data });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating the event.',
    });
  }
};
