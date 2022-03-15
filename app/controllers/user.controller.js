const db = require('../models');
const jwt = require('jsonwebtoken');
const Crypto = require('crypto');

const User = db.user;
const { Op } = db.Sequelize;

const encrypt = (passwordParam) => {
  const password_key = 'testing';
  return Crypto.createHmac('sha256', password_key)
    .update(passwordParam)
    .digest('hex');
};

exports.register = (req, res) => {
  // Validate request
  console.log(req);
  if (!req.body.username) {
    res.status(400).send({
      message: 'User name can not be empty!',
    });
    return;
  }
  // Create a User
  const userData = {
    username: req.body.username,
    password: encrypt(req.body.password),
  };
  // Save User in the database
  User.create(userData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the event.',
      });
    });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      username,
      password: encrypt(password),
    },
  })
    .then((data) => {
      if (data) {
        const jwtKey = 'testing1';
        const token = jwt.sign({ username }, jwtKey, {
          expiresIn: '7D',
        });
        const result = {
          ...data.dataValues,
          accessToken: `Bearer ${token}`,
        };
        res.send(result);
      } else {
        res.status(404).send({
          message: `username or password incorrect.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving user`,
      });
    });
};
