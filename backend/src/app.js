require('dotenv').config();
const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');
const passportSetup = require('./passport/strategies/passport');
const passportSettingRouter = require('./passport/index');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoute = require('./routes/auth');
// router
const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

mongoose.connect(URI).then(() => console.log('MongoDB is connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'session',
    keys: ['pyeonne'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
passportSettingRouter();
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoute);

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});
