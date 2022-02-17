const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  isRecruiting: {
    type: Boolean,
    default: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    min: 1,
    max: 100,
    required: true,
  },
  image: Buffer,
  content: {
    type: String,
    min: 0,
    max: 500,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  postImagePath: String,
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  preMembers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  likeMembers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  category: {
    type: String,
    required: true,
  },
  chat: [
    {
      _id: mongoose.Types.ObjectId,
      nickname: String,
      time: {
        type: Date,
        default: () => Date.now(),
      },
      text: String,
      profileImgURL: String,
    },
  ],
  createdAt: {
    type: Date,
    default: () => getCurrentDate(),
  },
});

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
  );
}
module.exports = PostSchema;
