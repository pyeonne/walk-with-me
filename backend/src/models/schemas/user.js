const mongoose = require('mongoose');

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
  profileImage: Buffer,
  gender: String,
  birthYear: Number,
  area: String,
  likes: [
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
});

module.exports = UserSchema;
