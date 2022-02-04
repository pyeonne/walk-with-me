const jwt = require('jsonwebtoken');

exports.setUser = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = { _id: decoded._id };
    return next();
  }

  next();
};
