const { User } = require('../models/index');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');
const generatePassword = require('../utils/generate-password');
const nodeMailer = require('../utils/node-mailer');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const CLIENT_URL = 'http://localhost:3000';

// 회원 가입
exports.signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // 가입된 계정
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    const error = new Error('이미 가입되었습니다.');
    err.status = 401;
    throw error;
  }

  const hashedPassword = hashPassword(password);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  res.locals.user = { _id: user._id }; // 나중에 로그인 할때도 처리
  res.status(200).json({ success: '회원가입' });
});

// 로그인
exports.signIn = async (req, res, next) => {
  try {
    passport.authenticate('local', (passportError, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없으면 에러
      if (passportError || !user) {
        res.status(400).json({ message: info.message });
        return;
      }
      // user 데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          res.json(loginError);
          return;
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.locals.user = { _id: user._id }; // 나중에 로그인 할때도 처리
        res.cookie('token', token);
        res.status(200).json({ user });
      });
    })(req, res);
  } catch (error) {
    next(error);
  }
};

// 로그아웃
exports.signOut = (req, res) => {
  res.cookie('token', '');
  res.status(200).send({ message: '로그아웃에 성공했습니다.' });
};

// 회원 정보 등록
// POST /api/users/:id/profile
// nickname, gender, area, birtYear, profileUrl, bio
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nickname, gender, area, birthYear, profileUrl, bio } = req.body;
  await User.updateOne(
    { _id: id },
    {
      nickname,
      gender,
      area,
      birthYear,
      profileUrl,
      bio,
    }
  );
  res.status(200).send({ success: '정보등록에 성공했습니다.' });
});

// 회원 정보 조회
// GET /api/users/:id/profile
exports.read = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const readUser = await User.findOne({ _id: id });
  const { nickname, gender, area, birthYear, profileUrl, bio } = readUser;

  if (!readUser) {
    const error = new Error('가입되지 않은 계정입니다.');
    error.status = 401;
    throw error;
  }
  res.status(200).send({ nickname, gender, area, birthYear, profileUrl, bio });
});

// 비밀번호 찾기
exports.findPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    const error = new Error('가입되지 않은 계정입니다.');
    error.status = 401;
    throw error;
  }

  const newPassword = generatePassword();
  try {
    await nodeMailer(
      email,
      '함께걸어YOU 비밀번호 찾기',
      `안녕하세요 함께걸어YOU입니다. 요청하신 임시 비밀번호는 ${newPassword} 입니다.`
    );
    await User.updateOne({ email }, { password: hashPassword(newPassword) });
    res.json({ success: '메일이 발송되었습니다.' });
  } catch (err) {
    const error = new Error('메일 발송에 실패했습니다.');
    error.status = 421;
    throw error;
  }
});

// 구글 로그인
exports.google = passport.authenticate('google', { scope: ['profile'] });
exports.googleCallback = passport.authenticate('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/login/failed',
});

// 카카오 로그인
exports.kakao = passport.authenticate('kakao');
exports.kakaoCallback = passport.authenticate('kakao', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/login/failed',
});

// 이메일 로그인
exports.loginSuccess = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
    });
  }
});

exports.loginFailed = asyncHandler(async (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

exports.logout = asyncHandler(async (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});
