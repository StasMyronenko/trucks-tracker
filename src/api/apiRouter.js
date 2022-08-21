const express = require('express');

const { authRouter } = require('./auth/authRouter');
const { userRouter } = require('./user/userRouter');

const { authMiddleware } = require('../middlewares/authMiddleware');

const { isDriver } = require('../middlewares/isDriverMiddleware');
const { truckRouter } = require('./truck/truckRouter');
const { loadRouter } = require('./load/loadRouter');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/users', authMiddleware, userRouter);

router.use('/loads', authMiddleware, loadRouter);

router.use('/trucks', authMiddleware, isDriver, truckRouter);

module.exports = {
  apiRouter: router,
};
