const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const isManager = require('../middleware/isManager');

//  ya3ni ken el manager bark ynajjem yasnaa user jdida
router.post('/signup', auth, isManager, authController.signup);

//  kol wahed yajjem yconnecti, ma fama 7atta middleware 
router.post('/login', authController.login);

module.exports = router;

