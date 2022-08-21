const express = require('express');
const {
  getLoads,
  addLoad,
  getActiveLoad,
  newState,
  getLoadById,
  updateLoadById,
  deleteLoadById,
  findDriver,
  allInfoLoad,
} = require('./loadController');
const { isShipper } = require('../../middlewares/isShipperMeddleware');
const { isDriver } = require('../../middlewares/isDriverMiddleware');

const router = express.Router();

router.get('/', getLoads);

router.post('/', isShipper, addLoad);

router.get('/active', isDriver, getActiveLoad);

router.patch('/active', isDriver, newState);

router.patch('/:id', isDriver, getLoadById);

router.put('/:id', updateLoadById);

router.delete('/:id', deleteLoadById);

router.post('/:id/post', findDriver);

router.get('/:id/shipping_info', allInfoLoad);

module.exports = {
  loadRouter: router,
};
