const authCtrl = require('../controllers/auth');
const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000';

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

// 소셜 로그인
router.get('/google', authCtrl.google);
router.get('/google.callback', authCtrl.googleCallback);
router.get('/kakao', authCtrl.kakao);
router.get('/kakao/callback', authCtrl.kakaoCallback);

router.post('/signup', authCtrl.signUp);
router.post('/find-password', authCtrl.findPassword);
router.post('/signin', authCtrl.signIn);
// router.post('/signout', authCtrl.signOut);

module.exports = router;
