const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Post } = require('../models');

exports.checkPostId = (req, res, next) => {
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    return next();
  }
  console.log('나호출됨');
  res.status(400); // Bad Request
  const error = new Error('잘못된 접근입니다.');
  return next(error);
};

exports.checkPostExist = async (req, res, next) => {
  const { id: postId } = req.params;
  const post = await Post.findById(postId);

  if (!post) {
    res.status(404); // Not Found
    const error = new Error('존재하지 않는 포스트입니다.');
    return next(error);
  }

  res.locals.post = post;
  return next();
};

exports.checkOwnPost = async (req, res, next) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;
  const { author } = await Post.findById(postId).populate('author');

  if (userId === author._id.toString()) {
    return next();
  }

  res.status(401); // Unauthorized
  const error = new Error('권한이 없습니다.');
  return next(error);
};
