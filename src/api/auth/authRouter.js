const express = require('express');

const { registerUser, loginUser, forgotPassword } = require('./authController');

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/forgot_password', forgotPassword)

module.exports = {
  authRouter: router,
};
