const express = require('express');
const {
  addTruck, getTrucks, getTruckById, updateTruckById, deleteTruckById, assignTruckById,
} = require('./truckController');

const router = express.Router();

router.get('/', getTrucks);

router.post('/', addTruck);

router.get('/:id', getTruckById);

router.put('/:id', updateTruckById);

router.delete('/:id', deleteTruckById);

router.post('/:id/assign', assignTruckById);

module.exports = {
  truckRouter: router,
};
