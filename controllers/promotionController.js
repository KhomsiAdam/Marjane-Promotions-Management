// Validator
const { validationResult } = require('express-validator');

// Models
const Promotion = require('../models/Promotion');
const Product = require('../models/Product');
const Center = require('../models/Center');
const Manager = require('../models/Manager');
// Log Controller
const logController = require("./logController");

exports.create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const discount = req.body.discount;
  const startingDate = req.body.startingDate;
  const endingDate = req.body.endingDate;
  const productId = req.body.productId;
  const centerId = req.centerId;

  Product.findOne({ where: { id: productId }, raw: true })
    .then(product => {
      if (!product) {
        const error = new Error('A product with this id could not be found.');
        error.statusCode = 401;
        throw error;
      }
      console.log(product);
      if ((product.category === 'Multimedia' && discount <= 20 && product.price > 50) || (product.category !== 'Multimedia' && discount <= 50 && product.price > 50)) {
        console.log('OK');
        const fidelity = (product.price * discount) / 100;
        console.log(fidelity + ' points');
        const promotion = new Promotion({
          discount: discount,
          fidelity: fidelity,
          status: 'Pending',
          currentStock: product.quantity,
          startingDate: startingDate,
          endingDate: endingDate,
          productId: productId,
          centerId: centerId
        });
        promotion
          .save()
          .then(result => {
            logController.saveLog(
              "Admin",
              result.id,
              "Promotion creation",
              `A Promotion on the following product has been added:
              Product ID: ${result.productId}, 
              Promotion discount: ${result.discount}%,
              Current stock: ${result.currentStock},
              Center ID: ${result.centerId}`
            );
            res.status(201).json({
              message: 'Promotion created successfully!',
              promotion: result
            });
          })
          .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
      } else if ((product.category === 'Multimedia' && discount > 20 && product.price > 50) || (product.category !== 'Multimedia' && discount > 50 && product.price > 50)) {
        console.log('NO');
        let message;
        if (product.category === 'Multimedia') {
          message = 'Product discount of Multimedia category must not exceed 20%.';
        } else {
          message = 'Product discount must not exceed 50%.';
        }
        res.status(400).json({
          message: message
        });
      } else if (product.price < 50) {
        console.log('NO');
        let message = 'Cannot apply promotion on Product with a price lower than 50 MAD.';
        res.status(400).json({
          message: message
        });
      }
    })
};

exports.getPromotions = (req, res, next) => {
  // Get all promotions 
  Promotion.findAll({ include: [{ model: Product }, { model: Center }], where: { centerId: req.centerId }, raw: true })
    .then(promotions => {
      if (promotions.length > 0) {
        res.status(200).json({
          message: `Promotions fetched successfully`,
          promotions: promotions
        });
      } else {
        res.status(200).json({
          message: 'There are no promotions available.'
        });
      }
    })
}

exports.getAllPromotions = (req, res, next) => {
  // Get all products 
  Promotion.findAll({ include: [{ model: Product }, { model: Center }], raw: true })
    .then(promotions => {
      if (promotions.length > 0) {
        res.status(200).json({
          message: `Promotions fetched successfully`,
          promotions: promotions
        });
      } else {
        res.status(200).json({
          message: 'There are no promotions available.'
        });
      }
    })
}
exports.getProducts = (req, res, next) => {
  // Get all products 
  Product.findAll({ raw: true })
    .then(products => {
      if (products.length > 0) {
        res.status(200).json({
          message: `Products fetched successfully`,
          products: products
        });
      } else {
        res.status(200).json({
          message: 'There are no products available.'
        });
      }
    })
}

exports.getCenters = (req, res, next) => {
  // Get all products 
  Center.findAll({ raw: true })
    .then(centers => {
      if (centers.length > 0) {
        res.status(200).json({
          message: `Centers fetched successfully`,
          centers: centers
        });
      } else {
        res.status(200).json({
          message: 'There are no centers available.'
        });
      }
    })
}

exports.getMyCenters = (req, res, next) => {
  // Get all products 
  Center.findAll({ where: { id: req.centerId }, raw: true })
    .then(centers => {
      if (centers.length > 0) {
        res.status(200).json({
          message: `Centers fetched successfully`,
          centers: centers
        });
      } else {
        res.status(200).json({
          message: 'There are no centers available.'
        });
      }
    })
}

exports.getMyPromotions = (req, res, next) => {
  // Get current date
  const date = new Date();

  const hour = date.getHours();

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear()

  const currentDate = year + "-" + month + "-" + day;

  // Check if current hour is between 8am and 12pm
  if (hour >= 8 && hour <= 12) {
  // Get all promotions affected to the manager by category and center with product informations
  Promotion.findAll({ include: [{ model: Product, where: { category: req.category } }, { model: Center }], where: { centerId: req.centerId, status: 'Untreated' }, raw: true })
    .then(promotions => {
      if (promotions.length > 0) {
        const inRange = [];
        for (let promotion of promotions) {
          const from = promotion.startingDate;
          const to = promotion.endingDate;
          if (from.localeCompare(currentDate) <= 0 && to.localeCompare(currentDate) >= 0) {
            console.log("Date is in range")
            inRange.push(promotion);
          } else {
            console.log("Date is not in range")
          }
        }
        if (inRange.length > 0) {
          res.status(200).json({
            message: `Promotions of category ${req.category} fetched successfully`,
            promotions: inRange
          });
        } else {
          res.status(200).json({
            message: 'There are no promotions available.'
          });
        }
      } else {
        res.status(200).json({
          message: 'There are no promotions available.'
        });
      }
    })
  } else {
    res.status(200).json({
      message: 'You are connected outside of the given time range.'
    });
  }
};

exports.getPromotionById = (req, res, next) => {
  // Get all promotions affected to the manager by category and center with product informations
  Promotion.findOne({ include: [{ model: Product }, { model: Center }], where: { id: req.params.id }, raw: true })
    .then(promotion => {
      if (promotion) {
        res.status(200).json({
          message: `Promotion with id ${req.params.id} fetched successfully`,
          promotion: promotion
        });
      } else {
        res.status(200).json({
          message: 'There is no promotion with this id.'
        });
      }
    })
};

exports.updatePromotion = (req, res, next) => {
  const promotionId = req.body.promotionId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const userId = req.id;
  const status = req.body.status;
  const comment = req.body.comment;
  const currentStock = req.body.currentStock;
  Promotion.update({ status: status, comment: comment, currentStock: currentStock }, { where: { id: promotionId } })
    .then(result => {
      logController.saveLog(
        "Manager",
        userId,
        "Promotion update",
        `Manager of (${req.category}) aisle processed promotion: ${promotionId} of center: ${req.centerId}`
      );
      // console.log(result);
      res.status(200).json({ message: 'Promotion updated!' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};