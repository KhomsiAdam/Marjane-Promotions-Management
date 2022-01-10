// dotenv
require('dotenv').config();
// Validator
const { validationResult } = require('express-validator');
// Bcrypt
const bcrypt = require('bcryptjs');
// JWT
const jwt = require('jsonwebtoken');

// Models
const SuperAdmin = require('../models/SuperAdmin');
const Promotion = require('../models/Promotion');
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const Manager = require('../models/Manager');
const Center = require('../models/Center');
const Log = require('../models/Logs');


// Register
exports.register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  // Hash password then create the user
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new SuperAdmin({
        email: email,
        password: hashedPw
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'SuperAdmin created!' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Login
exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  SuperAdmin.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      // Check password
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      // Generate token
      const token = jwt.sign(
        {
          id: loadedUser.id
        },
        process.env.SUPER_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token });
      console.log(token);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Verify
exports.verify = (req, res, next) => {
  res.status(200).json('verified');
};

// Count all entries/rows of all tables
exports.countAll = (req, res, next) => {
  const count = {}
  Promotion.count().then(number => {
    count.promotions = number;
  })
  Product.count().then(number => {
    count.products = number;
  })
  Admin.count().then(number => {
    count.admins = number;
  })
  Manager.count().then(number => {
    count.managers = number;
  })
  Center.count().then(number => {
    count.centers = number;
  }).then(result => {
    res.status(200).json(count);
  })
};

// Logs
exports.getLogs = (req, res, next) => {
  // Get all logs 
  Log.findAll({ raw: true })
    .then(logs => {
      if (logs.length > 0) {
        res.status(200).json({
          message: `Logs fetched successfully`,
          logs: logs
        });
      } else {
        res.status(200).json({
          message: 'There are no logs available.'
        });
      }
    })
}
