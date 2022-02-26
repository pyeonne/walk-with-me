const { Server } = require('socket.io');
const { User } = require('../models');
const { Post } = require('../models');

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'https://elice-kdt-sw-1st-team6.elicecoding.com',
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('send-message', (message) => {
      socket.broadcast.emit('receive-message', message);
    });
    
  });

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
      removeUser(socket.id);
      io.emit('getUsers', users);
    });
  });
};
module.exports = socket;
