const { Post, User } = require('../models/');
const asyncHandler = require('../utils/async-handler');

/* 특정 포스트 조회
GET /api/posts/:id
 */
exports.read = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.status(200).json(post);
});

/* 포스트 목록
GET /api/posts
GET /api/posts?age=20&category=running
 */
exports.list = asyncHandler(async (req, res) => {
  const queryObj = req.query;
  const { age, category, area } = queryObj;

  if (Object.keys(queryObj).length === 0) {
    const posts = await Post.find();
    res.status(200).json(posts);
    return;
  }

  const posts = await Post.find({
    $or: [{ age }, { category }, { area }],
  });

  res.status(200).json(posts);
});

/* 포스트 작성
POST /api/posts
 */
exports.create = asyncHandler(async (req, res) => {
  await Post.create(req.body);
  res.status(201).json({ success: '포스트 등록' });
});

/* 포스트 수정
PUT /api/posts/:id
 */
exports.update = asyncHandler(async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await Post.updateOne({ _id: id }, data);
  res.status(200).json({ success: '포스트 수정' });
});

/* 포스트 제거
DELETE /api/posts/:id
 */
exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Post.deleteOne({ _id: id });
  res.status(200).json({ success: '포스트 삭제' });
});

/* 포스트 관심 등록
post /api/posts/:id/likes
 */
exports.like = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  // const { _id: userId } = res.locals.user;
  const userId = '61fcaa3f0eef334891fd736c';

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        likeMembers: userId,
      },
    },
    { new: true }
  ).populate('likeMembers');

  await User.findByIdAndUpdate(userId, {
    $push: {
      likes: postId,
    },
  });

  res.status(200).json(post.likeMembers);
});

/* 포스트 관심 해제
delete /api/posts/:id/likes
 */
exports.unlike = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  // const { _id: userId } = res.locals.user;
  const userId = '61fb91201312a009604af76a';

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        likeMembers: userId,
      },
    },
    { new: true }
  ).populate('likeMembers');

  await User.findByIdAndUpdate(userId, {
    $pull: {
      likes: postId,
    },
  });

  res.status(200).json(post.likeMembers);
});

/* 가입 신청
POST /api/posts/:id
*/
exports.apply = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { bio } = req.body;
  // const { _id: userId } = res.locals.user;
  const userId = '61fcaa3b0eef334891fd7369';

  await Post.findByIdAndUpdate(postId, {
    $push: {
      preMembers: userId,
    },
  });

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        applyPosts: {
          _id: postId,
          bio,
        },
      },
    },
    { new: true }
  );

  res.status(200).json(user);
});

exports.management = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate('members')
    .populate('preMembers');

  res.status(200).json({
    members: post.members,
    preMembers: post.preMembers,
  });
});

exports.allow = asyncHandler(async (req, res) => {
  const { id: postId, userId } = req.params;

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        members: userId,
      },
      $pull: {
        preMembers: userId,
      },
    },
    { new: true }
  )
    .populate('members')
    .populate('preMembers');

  res.status(200).json({
    members: post.members,
    preMembers: post.preMembers,
  });
});

exports.deny = asyncHandler(async (req, res) => {
  const { id: postId, userId } = req.params;

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        preMembers: userId,
      },
    },
    { new: true }
  ).populate('preMembers');

  res.status(200).json({
    preMembers: post.preMembers,
  });
});
