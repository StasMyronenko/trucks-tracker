const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    await res.status(400).json({ message: 'Not authenticate' });
    return;
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    await res.status(400).json({ message: 'Not authenticate' });
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
    await next();
  } catch (err) {
    await res.status(400).json({ message: 'Token error' });
  }
};
module.exports = {
  authMiddleware,
};
