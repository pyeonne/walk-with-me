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

/* http.createServer 안쓰면 이런식으로 접근도 가능 할듯하다.
const server = app.listen( port, () => {
  console.log('Express listening on port', port);
});
*/

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

/*

"socket.emit 데이터 줄때"
"socket.on 데이터 받을때"
"socket.join 룸을 만든다"


1. io는 서버 객체, socket은 클라이언트 객체이다.
2. on 은 이벤트를 받는 메서드, emit은 이벤트를 쏘는 메서드이다.
3. 일부 이벤트에 대응하는 콜백 함수의 인자는 지정되어 있다. 

*/

// 연결 됐을때 (소켓 서버에 접속)
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data); // 유저가 입력한 room으로 참가 시켜줌
    console.log(`User wiht ID: ${socket.id} joined room: ${data}`);
  });
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data); // 데이터로 들어온 정보(메세지,작성자 등) 을 해당하는 룸에 메세지 보내줌
  });
  // 연결 끊을때 콜백 (탭을 닫거나 페이지 이동시)
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
