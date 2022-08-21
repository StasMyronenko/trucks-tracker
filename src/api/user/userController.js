const bcrypt = require('bcryptjs');
const { User } = require('./models');

const getUsersProfile = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user) {
    await res.status(200).json({ user });
    next();
  } else {
    res.status(400).json({ message: 'Server Error' });
  }
};

const deleteProfile = async (req, res, next) => {
  const user = await User.findOneAndDelete({ email: req.user.email });
  if (user) {
    res.status(200).json({ message: 'Success' });
    next();
  } else {
    res.status(400).json({ message: 'Error' });
  }
};

const changePassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user && await bcrypt.compare(String(req.body.oldPassword), String(user.password))) {
    User.password = await bcrypt.hash(req.body.newPassword, 10);
    res.status(200).json({ message: 'Password changed successfully' });
    next();
  } else {
    res.status(200).json({ message: 'Invalid Password' });
  }
};

module.exports = {
  getUsersProfile,
  changePassword,
  deleteProfile,
};
