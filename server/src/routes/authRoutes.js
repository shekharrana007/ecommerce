const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();
const {body}= require('express-validator');


const loginValidator=[
    body('username')
    .notEmpty().withMessage('Username is required')
    .isEmail().withMessage('Username must be a valid email address'),
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

router.post('/login',loginValidator,authController.login);
router.post('/logout', authController.logout);
router.post('/is-User-Logged-In', authController.isUserLoggedIn);
router.post('/register', authController.register);
router.post('/google-auth', authController.googleAuth);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;