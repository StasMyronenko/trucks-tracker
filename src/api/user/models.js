const mongoose = require('mongoose');
const { ROLES } = require('../../data/user');

const User = mongoose.model('User', {
  role: {
    type: String,
    enum: [...ROLES],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = { User };
