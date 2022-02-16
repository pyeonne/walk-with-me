const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
  },
});

/*
Room : {
  posts : {
    _id: 'sssdfsfsd',
    author: {
      _id: sfsdfs,
      ...
    },
    title: 'sfsf',
    content: 'sfsdf'
    ...
  }
  messages : {
    
  }
}
*/

module.exports = RoomSchema;
