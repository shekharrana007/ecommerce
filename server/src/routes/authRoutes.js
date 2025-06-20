const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/is-User-Logged-In', authController.isUserLoggedIn);

module.exports = router;