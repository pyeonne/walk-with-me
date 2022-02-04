const authCtrl = require('../controllers/auth');
const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000';

router.get('/login/success', authCtrl.loginSuccess);
router.get('/login/failed', authCtrl.loginFailed);
router.get('/logout', authCtrl.logout);

// 소셜 로그인
router.get('/google', authCtrl.google);
router.get('/google.callback', authCtrl.googleCallback);
router.get('/kakao', authCtrl.kakao);
router.get('/kakao/callback', authCtrl.kakaoCallback);

router.post('/signup', authCtrl.signUp);
router.post('/find-password', authCtrl.findPassword);
router.post('/signin', authCtrl.signIn);
router.post('/signout', authCtrl.signOut);

module.exports = router;
