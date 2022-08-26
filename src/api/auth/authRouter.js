const express = require('express');

const {
  registerUser, loginUser, forgotPassword, restorePassword,
} = require('./authController');

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/forgot_password', forgotPassword);

router.post('/restore_password/:email', restorePassword);

module.exports = {
  authRouter: router,
};
