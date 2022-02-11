const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    min: 2,
    max: 10,
  },
  profileImagePath: String,
  gender: String,
  birthYear: Number,
  area: String,
  likePosts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
  applyPosts: [
    {
      _id: mongoose.Types.ObjectId,
      bio: {
        type: String,
        min: 2,
        max: 100,
        default: '',
      },
    },
  ],
  joinedPosts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
  kakaoId: Number,
});

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRE_TIME,
    }
  );
  return token;
};

UserSchema.methods.deleteApplyPost = async function (postId) {
  this.applyPosts = this.applyPosts.filter(
    (post) => post._id.toString() !== postId.toString()
  );
  await this.save();
};

module.exports = UserSchema;
