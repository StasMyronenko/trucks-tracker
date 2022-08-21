const express = require('express');

const { getUsersProfile, changePassword, deleteProfile } = require('./userController');

const router = express.Router();

router.get('/me', getUsersProfile);

router.delete('/me', deleteProfile);

router.patch('/me/password', changePassword);

module.exports = {
  userRouter: router,
};
