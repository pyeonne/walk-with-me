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

exports.checkLogin = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    // res.redirect('/');
    const error = new Error('잘못된 접근입니다.');
    throw error;
  }

  next();
};
