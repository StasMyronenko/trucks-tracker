const mongoose = require('mongoose');
const { TYPES, STATUS } = require('../../data/truck');

const Truck = mongoose.model('Truck', {
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: TYPES,
    required: true,
  },
  status: {
    type: String,
    enum: STATUS,
    required: true,
    default: 'IS',
  },
  created_date: {
    type: String,
    required: true,
  },
});

module.exports = {
  Truck,
};
