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
    const { email } = profile._json;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        password: newPassword,
      });
    }

    const token = user.generateToken();
    done(null, { token, user });
  }
);

exports.kakao = new KakaoStrategy(
  {
    clientID: KAKAO_CLIENT_ID,
    callbackURL: 'https://elice-kdt-sw-1st-team6.elicecoding.com/api/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id } = profile._json;

    let user = await User.findOne({ kakaoId: id });

    if (!user) {
      user = await User.create({
        email: `${newPassword}@kakao.wwm`,
        password: newPassword,
        kakaoId: id,
      });
    }

    const token = user.generateToken();
    done(null, { logoutToken: accessToken, token, user });
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
