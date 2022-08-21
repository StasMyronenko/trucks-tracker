const { User } = require('../api/user/models');

const isDriver = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user && user.role === 'DRIVER') {
    next();
  } else {
    res.status(400).json({ message: 'You are not driver or not authenticated' });
  }
};

module.exports = {
  isDriver,
};
