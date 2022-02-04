require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passportSetup = require('./passport/strategies/passport');
const passportSettingRouter = require('./passport/index');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');

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

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

app.use((err, req, res, next) => {
  res.json({ failure: err.message });
});
