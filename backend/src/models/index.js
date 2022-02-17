const mongoose = require('mongoose');

const UserSchema = require('./schemas/user');
const PostSchema = require('./schemas/post');
const RoomSchema = require('./schemas/room');
const ChatSchema = require('./schemas/chat');

module.exports = {
  User: mongoose.model('User', UserSchema),
  Post: mongoose.model('Post', PostSchema),
  Room: mongoose.model('Room', RoomSchema),
  Chat: mongoose.model('Chat', ChatSchema),
};
