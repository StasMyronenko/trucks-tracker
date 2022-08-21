const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({ message: 'Not authenticate' });
    return;
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    res.status(400).json({ message: 'Not authenticate' });
    return;
  }
  try {
    // eslint-disable-next-line no-undef
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      // eslint-disable-next-line no-underscore-dangle
      _id: tokenPayload._id,
      email: tokenPayload.email,
    };
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token error' });
  }
};
module.exports = {
  authMiddleware,
};
