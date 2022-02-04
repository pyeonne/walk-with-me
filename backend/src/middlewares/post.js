const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Post } = require('../models');

exports.checkObjectId = (req, res, next) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    return next();
  }

  const error = new Error('유효하지 않은 포스트 아이디입니다.');
  next(error);
};

exports.checkLogin = (req, res, next) => {
  if (true) {
    return next();
  }

  const error = new Error('로그인을 해주세요.');
  next(error);
};

exports.checkUser = async (req, res, next) => {
  const { id: postId } = req.params;
  // const { _id: userId } = res.locals.user;
  const userId = '61fcaa3f0eef334891fd736c';
  const { author } = await Post.findById(postId).populate('author');

  if (userId === author._id.toString()) {
    return next();
  }

  const error = new Error('권한이 없습니다.');
  next(error);
};
