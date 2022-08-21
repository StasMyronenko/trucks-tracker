const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../user/models');

async function registerUser(req, res, next) {
  const { role, email, password } = req.body;
  try {
    const user = new User({
      role,
      email,
      password: await bcrypt.hash(password, 10),
      createdDate: (new Date()).toLocaleString(),
    });
    await user.save();
    await res.status(200).send({ message: 'Success' });
  } catch (err) {
    await res.status(400).send({ message: `Error: ${err.message}` });
    return;
  }
  next();
}

async function loginUser(req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(String(req.body.password), String(user.password))) {
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      email: user.email,
    };
    // eslint-disable-next-line no-undef
    const jwtToken = jwt.sign(payload, process.env.SECRET_KEY);
    res.status(200).json({
      message: 'Success',
      jwt_token: jwtToken,
    });
    next();
    return;
  }
  res.status(400).json({ message: 'Invalid password or login' });
}

async function forgotPassword(req, res, next) {
  next();
}

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};
