// Express
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Models
const SuperAdmin = require('../models/SuperAdmin');
const Admin = require('../models/Admin');

// Controllers
const superController = require('../controllers/superController');
const adminController = require('../controllers/adminController');
const promotionController = require('../controllers/promotionController');

// Auth
const isSuper = require('../middleware/isSuper');

// SuperAdmin register
router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return SuperAdmin.findOne({
          where: {
            email: value
          }
        }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
  ],
  superController.register
);

// SuperAdmin login
router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
  ],
  superController.login);

// Admin creation
router.post('/admin',
  isSuper,
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return Admin.findOne({
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
    body('centerId')
      .trim()
  ],
  adminController.register
);

router.post('/verify', isSuper, superController.verify);

router.post('/admins', isSuper, adminController.getAdmins);
router.post('/products', isSuper, promotionController.getProducts);
router.post('/promotions', isSuper, promotionController.getAllPromotions);
router.post('/centers', isSuper, promotionController.getCenters);
router.post('/count', isSuper, superController.countAll);
router.post('/logs', isSuper, superController.getLogs);

module.exports = router;
