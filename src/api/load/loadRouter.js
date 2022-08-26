const express = require('express');
const {
  getLoads,
  createLoad,
  getActiveLoad,
  newState,
  getLoadById,
  updateLoadById,
  deleteLoadById,
  postLoad,
  allInfoLoad,
} = require('./loadController');
const { isShipper } = require('../../middlewares/isShipperMeddleware');
const { isDriver } = require('../../middlewares/isDriverMiddleware');

const router = express.Router();

router.get('/', getLoads);

router.post('/', isShipper, createLoad);

router.get('/active', isDriver, getActiveLoad);

router.patch('/active/state', isDriver, newState);

router.get('/:id', getLoadById);

router.put('/:id', isShipper, updateLoadById);

router.delete('/:id', isShipper, deleteLoadById);

router.post('/:id/post', isShipper, postLoad);

router.get('/:id/shipping_info', isShipper, allInfoLoad);

module.exports = {
  loadRouter: router,
};
