const { User } = require('../models/index');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');
const generatePassword = require('../utils/generate-password');
const nodeMailer = require('../utils/node-mailer');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// 회원 가입
exports.signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // 가입된 계정
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    const err = new Error('이미 가입되었습니다.');
    err.status = 401;
    throw err;
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
// exports.signIn = (req, res) => {
//   res.status(200).json({ success: '로그인' });
// };
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
        res.cookie('token', token);
        res.json({ user });
      });
    })(req, res);
  } catch (error) {
    next(error);
  }
};

// 로그아웃
exports.signOut = (req, res) => {
  res.cookie('token', '');
  req.logout();
  res.status(200).send({ message: '로그아웃에 성공했습니다.' });
};

// 비밀번호 찾기
exports.findPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    const error = new Error('가입되지 않은 계정입니다.');
    error.status = 401;
    throw err;
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
