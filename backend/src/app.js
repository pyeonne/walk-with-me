require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const socket = require('./socket/socket');

// router
const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

mongoose.connect(URI).then(() => console.log('MongoDB is connected'));

passportConfig();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.static('uploads'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

socket(server);

app.use((err, req, res, next) => {
  res.json({ failure: err.message });
});
