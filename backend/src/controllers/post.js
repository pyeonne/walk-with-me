const { Post, User } = require('../models/');
const asyncHandler = require('../utils/async-handler');

/* 특정 포스트 조회
GET /api/posts/:id
 */
exports.read = asyncHandler(async (req, res) => {
  const { _id } = res.locals.post;
  const post = await Post.findOne({ _id }).populate('author');
  res.status(200).json(post);
});

/* 포스트 목록
GET /api/posts
GET /api/posts?age=20&category=running
 */
exports.list = asyncHandler(async (req, res) => {
  const queryObj = req.query;
  const { age, category, isRecruiting } = queryObj;

  if (Object.keys(queryObj).length === 0) {
    const posts = await Post.find().populate('author');

    res.status(200).json(posts);
    return;
  }

  let posts;
  if (!category && !age)
    posts = await Post.find({
      $and: [{ isRecruiting }],
    })
      .sort({ createdAt: -1 })
      .populate('author');
  else if (!category)
    posts = await Post.find({
      $and: [{ age }, { isRecruiting }],
    })
      .sort({ createdAt: -1 })
      .populate('author');
  else if (!age)
    posts = await Post.find({
      $and: [{ category }, { isRecruiting }],
    })
      .sort({ createdAt: -1 })
      .populate('author');
  else
    posts = await Post.find({
      $and: [{ age }, { category }, { isRecruiting }],
    })
      .sort({ createdAt: -1 })
      .populate('author');

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
  const { _id } = res.locals.post;
  await Post.updateOne({ _id }, data);
  res.status(200).json({ success: '포스트 수정' });
});

/* 포스트 제거
DELETE /api/posts/:id
 */
exports.delete = asyncHandler(async (req, res) => {
  const { _id } = res.locals.post;
  await Post.deleteOne({ _id });
  res.status(200).json({ success: '포스트 삭제' });
});

/* 모집 상태
PUT /api/posts/:id/status
*/
exports.changeStatus = asyncHandler(async (req, res) => {
  const { _id } = res.locals.post;
  const post = await Post.findByIdAndUpdate(
    _id,
    [{ $set: { isRecruiting: { $eq: [false, '$isRecruiting'] } } }],
    { new: true }
  );

  res.status(200).json({
    isRecruiting: post.isRecruiting,
  });
});

/* 포스트 관심 등록
post /api/posts/:id/likes
 */
exports.like = asyncHandler(async (req, res) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;

  await User.findByIdAndUpdate(userId, {
    $push: {
      likePosts: postId,
    },
  });

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: {
        likeMembers: userId,
      },
    },
    { new: true }
  ).populate('likeMembers');

  res.status(200).json(post.likeMembers);
});

/* 포스트 관심 해제
delete /api/posts/:id/likes
 */
exports.unlike = asyncHandler(async (req, res) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;

  await User.findByIdAndUpdate(userId, {
    $pull: {
      likePosts: postId,
    },
  });

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        likeMembers: userId,
      },
    },
    { new: true }
  ).populate('likeMembers');

  res.status(200).json(post.likeMembers);
});

/* 가입 신청
POST /api/posts/:id/apply
*/
exports.apply = asyncHandler(async (req, res) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;
  const { text } = req.body;

  await Post.findByIdAndUpdate(postId, {
    $push: {
      preMembers: userId,
    },
  });

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        applyPosts: postId,
        bio: {
          _id: postId,
          text,
        },
      },
    },
    { new: true }
  );

  res.status(200).json(user);
});

/* 가입 신청 취소
POST /api/posts/:id/cancel
*/
exports.cancel = asyncHandler(async (req, res) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;
  const { bio } = req.body;

  await Post.findByIdAndUpdate(postId, {
    $pull: {
      preMembers: userId,
    },
  });

  const user = await User.findById(userId);
  await user.deleteApplyPost(postId);

  res.status(200).json(user);
});

/* 회원 관리
GET /api/posts/:id/management
*/
exports.management = asyncHandler(async (req, res) => {
  const { _id } = res.locals.post;

  const post = await Post.findOne({ _id })
    .populate('members')
    .populate('preMembers');

  res.status(200).json({
    _id,
    members: post.members,
    preMembers: post.preMembers,
  });
});

/* 회원 관리 수락
POST /api/posts/:id/management/:userId/allow
*/
exports.allow = asyncHandler(async (req, res) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;

  console.log(userId);
  const user = await User.findById(userId);
  await user.deleteApplyPost(postId);

  await User.findByIdAndUpdate(userId, {
    $push: {
      joinedPosts: postId,
    },
  });

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

/* 회원 관리 거절
POST /api/posts/:id/management/:userId/deny
*/
exports.deny = asyncHandler(async (req, res) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;

  const user = await User.findById(userId);
  await user.deleteApplyPost(postId);

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

/* 회원 관리 퇴출
DELETE /api/posts/:id/management/:userId/kick
*/
exports.kick = asyncHandler(async (req, res) => {
  const { _id: postId } = res.locals.post;
  const { _id: userId } = res.locals.user;

  await User.findByIdAndUpdate(userId, {
    $pull: {
      joinedPosts: postId,
    },
  });

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: {
        members: userId,
      },
    },
    { new: true }
  ).populate('members');

  res.status(200).json({
    members: post.members,
  });
});
