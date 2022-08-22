const mongoose = require('mongoose');
const { STATUS, STATE } = require('../../data/load');

const dimensions = mongoose.Schema({
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  height: {
    type: Number,
  },
});

const log = mongoose.Schema({
  message: {
    default: '',
    type: String,
  },
  time: {
    type: String,
  },
});

const Load = mongoose.model('Load', {
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: STATUS,
    default: 'NEW',
  },
  state: {
    type: String,
    enum: STATE,
  },
  name: {
    type: String,
  },
  payload: {
    type: Number,
  },
  pickup_address: {
    type: String,
  },
  delivery_address: {
    type: String,
  },
  dimensions: {
    type: dimensions,
  },

  logs: {
    type: [log],
  },

  created_date: {
    type: String,
  },
});

module.exports = {
  Load,
};
