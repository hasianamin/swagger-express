const db = require('../models');
const utils = require('../helpers/utils');
const { downloadResource } = utils;

const Transaction = db.transaction;
const Product = db.product;
const Company = db.company;
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
  try {
    const result = await Transaction.findAll({
      attributes: {
        include: [
          [db.sequelize.col('product.name'), 'productName'],
          [db.sequelize.col('company.name'), 'companyName'],
          [db.sequelize.col('product.price'), 'productPrice'],
          [db.sequelize.literal('amount * product.price'), 'totalPrice'],
        ],
        exclude: ['productId', 'companyId'],
      },
      include: [
        {
          model: Product,
          attributes: [],
        },
        {
          model: Company,
          attributes: [],
        },
      ],
    });

    const fields = [
      {
        label: 'id',
        value: 'id',
      },
      {
        label: 'createdAt',
        value: 'createdAt',
      },
      {
        label: 'companyName',
        value: 'companyName',
      },
      {
        label: 'productName',
        value: 'productName',
      },
      {
        label: 'productPrice',
        value: 'productPrice',
      },
      {
        label: 'amount',
        value: 'amount',
      },
      {
        label: 'totalPrice',
        value: 'totalPrice',
      },
    ];
    const createTableCsv = result.map((item) => {
      return item.dataValues;
    });
    return downloadResource(res, 'transaction.csv', fields, createTableCsv);
  } catch (error) {
    res.status('500').send({ message: error.message });
  }
};
