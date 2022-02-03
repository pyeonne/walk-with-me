/* require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../models/index');
const config = {
  clientID: process.env.clientID,
  clentSecret: process.env.clentSecret,
  callbackURL: '',
};

async function findOrCreateUser({ email }) {
  const user = await User.findOne({ email });

  if (user) {
    return user;
  }
  const created = await User.create({
    email,
    password: 'GOOGLE_OAUTH',
  });

  return created;
}

module.exports = new GoogleStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const { email } = profile._json;

    try {
      const user = await findOrCreateUser({ email });
      done(null, {
        email: user.email,
      });
    } catch (e) {
      done(e, null);
    }
  }
);
*/
