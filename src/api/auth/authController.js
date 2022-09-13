const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../user/models');
const { sendEmailRestorePassword } = require('../../emailer/emailer');

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
  await next();
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
    await res.status(200).json({
      message: 'Success',
      jwt_token: jwtToken,
    });
    await next();
    return;
  }
  await res.status(400).json({ message: 'Invalid password or login' });
}

async function forgotPassword(req, res, next) {
  try {
    await sendEmailRestorePassword(req.body.email);
    await res.status(200).json({ message: 'We send message on your email' });
    await next();
  } catch (err) {
    await res.status(400).json({ message: `Error ${err.message}` });
  }
}

const restorePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();
    await res.status(200).json({ message: 'Password saved' });
    await next();
  } catch (err) {
    await res.status(400).json({ message: `Error ${err.message}` });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  restorePassword,
};
