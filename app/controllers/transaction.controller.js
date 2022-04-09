const db = require('../models');

const Transaction = db.transaction;
const Product = db.product;
const { Op } = db.Sequelize;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.productId || !req.body.companyId) {
    res.status(400).send({
      message: 'data can not be empty!',
    });
    return;
  }

  const newData = {
    companyId: req.body.companyId,
    productId: req.body.productId,
    amount: req.body.amount,
  };
  db.sequelize.transaction(async (t) => {
    try {
      await Transaction.create(newData, { transaction: t });
      const existingProduct = await Product.findOne({
        where: { id: req.body.productId },
      });
      await Product.update(
        {
          quantity: existingProduct.dataValues.quantity - req.body.amount,
        },
        {
          where: { id: req.body.productId },
          transaction: t,
        },
      );
      res.send(existingProduct);
    } catch (error) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the event.',
      });
    }
  });
};

exports.print = async (req, res) => {
  const result = Transaction.findAll({
    include: [
      {
        model: Product,
      },
    ],
  });
  res.send({ data: result });
};
