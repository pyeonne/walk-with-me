const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Post } = require('../models');

exports.checkObjectId = (req, res, next) => {
  const { id: postId, userId } = req.params;

  if (ObjectId.isValid(postId) && !userId) {
    return next();
  }

  if (ObjectId.isValid(postId) && ObjectId.isValid(userId)) {
    return next();
  }

  const error = new Error('잘못된 접근입니다.');
  next(error);
};

exports.checkLogin = async (req, res, next) => {
  if (res.locals.user) {
    return next();
  }

  const error = new Error('로그인을 해주세요.');
  next(error);
};

exports.checkOwnPost = async (req, res, next) => {
  const { id: postId } = req.params;
  const { _id: userId } = res.locals.user;
  const { author } = await Post.findById(postId).populate('author');

  if (userId === author._id.toString()) {
    return next();
  }

  const error = new Error('권한이 없습니다.');
  next(error);
};
