const { Post, User } = require('../models/');

/* 특정 포스트 조회
GET /api/posts/:id
 */
exports.read = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.status(200).json(post);
};

/* 포스트 목록
GET /api/posts
GET /api/posts?age=20&category=running
 */
exports.list = async (req, res) => {
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
};

/* 포스트 작성
POST /api/posts
 */
exports.create = async (req, res) => {
  await Post.create(req.body);
  res.status(201).json({ success: '포스트 등록' });
};

/* 포스트 수정
PUT /api/posts/:id
 */
exports.update = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await Post.updateOne({ _id: id }, data);
  res.status(200).json({ success: '포스트 수정' });
};

/* 포스트 제거
DELETE /api/posts/:id
 */
exports.delete = async (req, res) => {
  const { id } = req.params;
  await Post.deleteOne({ _id: id });
  res.status(200).json({ success: '포스트 삭제' });
};

/* 포스트 관심 등록
post /api/posts/:id/likes
 */
exports.like = async (req, res) => {
  const { id: postId } = req.params;
  // const { _id: userId } = res.locals.user;
  const userId = '61fb91201312a009604af76a';

  const post = await Post.findByIdAndUpdate(postId, {
    $push: {
      likeMembers: userId,
    },
  }).populate('likeMembers');

  await User.findByIdAndUpdate(userId, {
    $push: {
      likes: postId,
    },
  });

  res.status(200).json(post.likeMembers);
};

/* 포스트 관심 해제
delete /api/posts/:id/likes
 */
exports.unlike = async (req, res) => {
  const { id: postId } = req.params;
  // const { _id: userId } = res.locals.user;
  const userId = '61fb91201312a009604af76a';

  const post = await Post.findByIdAndUpdate(postId, {
    $pull: {
      likeMembers: userId,
    },
  }).populate('likeMembers');

  await User.findByIdAndUpdate(userId, {
    $pull: {
      likes: postId,
    },
  });

  res.status(200).json(post.likeMembers);
};

/* 가입 신청
POST /api/posts/:id
*/
exports.apply = async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;
  // const { _id: userId } = res.locals.user;
  const userId = '61fb91201312a009604af76a';
  await Post.updateOne(
    { _id: id },
    {
      $push: {
        preMembers: userId,
      },
    }
  );

  const user = await User.findByIdAndUpdate(userId, {
    $push: {
      applyPosts: {
        _id: id,
        bio,
      },
    },
  });

  // res.status(200).json({ success: '가입 신청 완료' });
  res.status(200).json(user);
};
