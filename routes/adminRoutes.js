// Express
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Models
const Manager = require('../models/Manager');

// Controllers
const adminController = require('../controllers/adminController');
const managerController = require('../controllers/managerController');
const promotionController = require('../controllers/promotionController');

// Auth
const isAdmin = require('../middleware/isAdmin');

// Admin login
router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
  ],
  adminController.login);

// Manager creation
router.post('/manager',
  isAdmin,
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return Manager.findOne({
          where: {
            email: value
          }
        }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('category')
      .trim(),
    body('centerId')
      .trim()
  ],
  managerController.register
);

// Promotion creation
router.post('/promotion',
  isAdmin,
  [
    body('discount')
      .trim(),
    body('day')
      .trim(),
    body('productId')
      .trim()
  ],
  promotionController.create
);

// Get all promotions
router.post('/promotions', isAdmin, promotionController.getPromotions);
// Get all products
router.post('/products', isAdmin, promotionController.getProducts);

router.post('/verify', isAdmin, adminController.verify);

router.post('/managers', isAdmin, managerController.getManagers);
router.post('/centers', isAdmin, promotionController.getMyCenters);

module.exports = router;
