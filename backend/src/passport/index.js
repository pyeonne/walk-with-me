const passport = require('passport');

const local = require('./strategies/local');
const oauth = require('./strategies/oauth');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user)
    } catch (error) {
      done(error)
    }
  })

  passport.use(local);
  passport.use(oauth.google);
  passport.use(oauth.kakao);
};
