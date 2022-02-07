const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/async-handler');
const { ObjectId } = mongoose.Types;

exports.checkTokenAndSetUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) return next();

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.locals.user = { _id: decoded._id };

  return next();
});

exports.checkLogin = (req, res, next) => {
  if (!res.locals.user) {
    res.status(401); // Unauthorized
    const error = new Error('로그인이 필요한 서비스입니다.');
    return next(error);
  }

  return next();
};

exports.checkUserId = (req, res, next) => {
  const { userId } = req.params;

  if (ObjectId.isValid(userId)) {
    return next();
  }

  res.status(400); // Bad Request
  const error = new Error('잘못된 접근입니다.');
  return next(error);
};
