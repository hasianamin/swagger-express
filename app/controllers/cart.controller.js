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

exports.update = (req, res) => {
  const { cartId } = req.params;
  // Validate request
  if (!req.body.userId || !req.body.productId) {
    res.status(400).send({
      message: 'data can not be empty!',
    });
    return;
  }

  const newData = {
    amount: req.body.amount,
  };

  Cart.update(newData, { where: { id: cartId } })
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
    const { userId } = req.query;
    const data = await Cart.findAll({
      include: ['product', 'user'],
      where: { userId },
    });
    res.send({ data });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while creating the event.',
    });
  }
};
