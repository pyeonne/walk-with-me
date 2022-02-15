require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passportSettingRouter = require('./passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// 소캣연습
const http = require('http');
const { Server } = require('socket.io');
const { checkTokenAndSetUser } = require('./middlewares/auth');

// router
const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

mongoose.connect(URI).then(() => console.log('MongoDB is connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(passport.initialize());
passportSettingRouter();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
// 소캣
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
app.use(checkTokenAndSetUser);
app.use('/api', apiRouter);

// 연결 됐을때
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User wiht ID: ${socket.id} joined room: ${data}`);
  });
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });
  // 연결 끊으려 할때 콜백
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

app.use((err, req, res, next) => {
  res.json({ failure: err.message });
});
