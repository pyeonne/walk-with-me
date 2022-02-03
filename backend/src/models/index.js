const mongoose = require('mongoose');

const UserSchema = require('./schemas/user');
const PostSchema = require('./schemas/post');

module.exports = {
  User: mongoose.model('User', UserSchema),
  Post: mongoose.model('Post', PostSchema),
};
