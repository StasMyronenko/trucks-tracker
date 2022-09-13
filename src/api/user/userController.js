const bcrypt = require('bcryptjs');
const { User } = require('./models');

const getUsersProfile = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user) {
    await res.status(200).json({ user });
    await next();
  } else {
    await res.status(400).json({ message: 'Server Error' });
  }
};

const deleteProfile = async (req, res, next) => {
  const user = await User.findOneAndDelete({ email: req.user.email });
  if (user) {
    await res.status(200).json({ message: 'Success' });
    await next();
  } else {
    await res.status(400).json({ message: 'Error' });
  }
};

const changePassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user && await bcrypt.compare(String(req.body.oldPassword), String(user.password))) {
    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();
    await res.status(200).json({ message: 'Password changed successfully' });
    await next();
  } else {
    await res.status(400).json({ message: 'Invalid Password' });
  }
};

module.exports = {
  getUsersProfile,
  changePassword,
  deleteProfile,
};
