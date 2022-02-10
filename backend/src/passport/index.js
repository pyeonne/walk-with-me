const passport = require('passport');

const local = require('./strategies/local');
const jwt = require('./strategies/jwt');
const oauth = require('./strategies/oauth');

module.exports = () => {
  passport.use(local);
  passport.use(jwt);
  passport.use(oauth.google);
  passport.use(oauth.kakao);
};
