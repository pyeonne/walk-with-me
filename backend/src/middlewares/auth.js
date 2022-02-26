const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/async-handler');
const { ObjectId } = mongoose.Types;

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
    res.locals.userId = userId;
    return next();
  }

  res.status(400); // Bad Request
  const error = new Error('잘못된 접근입니다.');
  return next(error);
};
