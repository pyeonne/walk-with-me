const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../models');
const generatePassword = require('../../utils/generate-password');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const newPassword = generatePassword();

exports.google = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://elice-kdt-sw-1st-team6.elicecoding.com/api/auth/google/callback',
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      const user = await User.findOne({ snsId: profile.id, provider: 'google' });
      if (user) {
        done(null, user);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.email,
          password: 'google',
          snsId: profile.id,
          provider: 'google'
        });
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
);

exports.kakao = new KakaoStrategy(
  {
    clientID: KAKAO_CLIENT_ID,
    callbackURL: 'https://elice-kdt-sw-1st-team6.elicecoding.com/api/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ snsId: profile.id, provider: 'kakao' });
      if (user) {
        done(null, user);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account.email,
          password: 'kakao',
          snsId: profile.id,
          provider: 'kakao'
        });
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
);