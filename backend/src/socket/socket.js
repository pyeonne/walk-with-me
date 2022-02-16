const { Server } = require('socket.io');
const { User } = require('../models');
const { Post } = require('../models');
const { Chat } = require('../models');
const { Room } = require('../models');

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });
  /*
      "socket.emit 데이터 줄때"
      "socket.on 데이터 받을때"
      "socket.join 룸을 만든다"
      */

  // 연결 됐을때 (소켓 서버에 접속)
  /*
  io.on('connection', async (socket) => {
    // const { userId, postId } = socket.request.headers;
    const userId = socket.request.headers['user-id'];
    const postId = socket.request.headers['post-id'];

    const user = await User.findOne({ _id: userId });
    const post = await Post.findOne({ _id: postId });
    // console.log(postId);
    // const shortId = postId;
    const room = await Room.findOne({ shortId: postId }).populate('post');

    socket.on('join_room', async (postId) => {
      console.log(`1방에 들어옴`);
      if (!room) {
        const newRoom = await Room.create({ shortId: postId });
        socket.join(newRoom.shortId); // 유저가 입력한 room으로 참가 시켜줌
        console.log(`2방에 들어옴`);
      }
      socket.join(room.shortId); // 유저가 입력한 room으로 참가 시켜줌
      console.log(`3방에 들어옴`);
    });

    // socket.join(); // 유저가 입력한 room으로 참가 시켜줌

    socket.on('send_message', async (message) => {
      const chat = await Chat.create({
        room,
        author: user,
        message: message,
      });
      socket.to(room).emit('receive_message', chat.author, chat.message); // 데이터로 들어온 정보(메세지,작성자 등) 을 해당하는 룸에 메세지 보내줌
    });

    // 연결 끊을때 콜백 (탭을 닫거나 페이지 이동시)
    socket.on('disconnect', () => {
      console.log('User Disconnected', socket.id);
    });
  });
  */

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on('connection', (socket) => {
    // when connect
    console.log('유저 접속');

    socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      io.emit('getUsers', users);
    });

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(senderId);
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
      });
    });

    // when disconnect
    socket.on('disconnect', () => {
      console.log('a user disconnect');
      removeUser(socket.id);
      io.emit('getUsers', users);
    });
  });
};
module.exports = socket;
