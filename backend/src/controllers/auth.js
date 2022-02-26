const { User } = require('../models');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');
const generatePassword = require('../utils/generate-password');
const nodeMailer = require('../utils/node-mailer');
const passport = require('passport');
const axios = require('axios');
const fs = require('fs');

// 회원 가입
exports.signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // 가입된 계정
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    res.status(401);
    const error = new Error('중복된 이메일입니다.');
    throw error;
  }

  const hashedPassword = hashPassword(password);
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  // const token = user.generateToken();
  // res.cookie('token', token, {
  //   httpOnly: true,
  //   maxAge: process.env.EXPIRE_TIME,
  // });

  res.status(200).json(user);
});

// 로그인
exports.signIn = async (req, res, next) => {
  try {
    passport.authenticate('local', (passportError, user, error) => {
      // 인증이 실패했거나 유저 데이터가 없으면 에러
      if (passportError || !user) {
        res.status(400).json({ failure: error.message });
        return;
      }
      // user 데이터를 통해 로그인 진행
      return req.login(user, (loginError) => {
        if (loginError) {
          res.json(loginError);
          return;
        }

        // const token = user.generateToken();
        // res.cookie('token', token, {
        //   httpOnly: true,
        //   maxAge: process.env.EXPIRE_TIME,
        // });
        

        res.status(200).json(user);
      });
    })(req, res);
  } catch (error) {
    next(error);
  }
};

// 로그아웃
exports.signOut = (req, res) => {
  req.logout();
  req.session.destroy();
};

// 회원 정보 등록
// POST /api/auth/:id/profile
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { profileImgURL, nickname, gender, area, birthYear } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      profileImgURL,
      nickname,
      gender,
      area,
      birthYear,
    },
    { new: true }
  );

  res.status(200).json(user);
});

// 회원 정보 조회
// GET /api/users/:id/profile
exports.read = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const readUser = await User.findOne({ _id: id })
    .populate('likePosts')
    .populate('joinedPosts')
    .populate('applyPosts');

  if (!readUser) {
    const error = new Error('가입되지 않은 계정입니다.');
    res.status(401);
    throw error;
  }

  res.status(200).json(readUser);
});

// 회원 정보 수정
exports.modify = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nickname, gender, area, birthYear } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      nickname,
      gender,
      area,
      birthYear,
    },
    { new: true }
  );
  res.status(200).json(user);
});

// 비밀번호 찾기
exports.findPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    const error = new Error('가입되지 않은 계정입니다.');
    res.status(401);
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
    res.status(421);
    throw error;
  }
});

// 비밀번호 변경
// patch /api/users/:id/profile/password
exports.changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const readUser = await User.findOne({ _id: id });
  readUser.password = hashPassword(password);
  await readUser.save();
  res.json({ success: '비밀번호가 변경되었습니다.' });
});

// 구글 로그인
exports.google = passport.authenticate('google', {
  scope: ['email', 'profile'],
});
exports.googleCallback = passport.authenticate('google', {
  failureRedirect: '/signin',
  successRedirect: '/'
})

// 카카오 로그인
exports.kakao = passport.authenticate('kakao');
exports.kakaoCallback = passport.authenticate('kakao', {
  failureRedirect: '/signin',
  successRedirect: '/'
})

exports.loginSuccess = async (req, res) => {
  res.status(200).json(req.user);
}