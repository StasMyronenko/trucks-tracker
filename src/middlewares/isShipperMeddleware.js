const { User } = require('../api/user/models');

const isShipper = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (user && user.role === 'SHIPPER') {
    await next();
  } else {
    await res.status(400).json({ message: 'You are not shipper or not authenticated' });
  }
};

module.exports = {
  isShipper,
};
