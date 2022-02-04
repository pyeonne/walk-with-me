const authCtrl = require('../controllers/auth');
const router = require('express').Router();

router.get('/login/success', authCtrl.loginSuccess);
router.get('/login/failed', authCtrl.loginFailed);
router.get('/logout', authCtrl.logout);

// 소셜 로그인
router.get('/google', authCtrl.google);
router.get('/google.callback', authCtrl.googleCallback);
router.get('/kakao', authCtrl.kakao);
router.get('/kakao/callback', authCtrl.kakaoCallback);

// 로컬 로그인
router.post('/signup', authCtrl.signUp);
router.post('/find-password', authCtrl.findPassword);
router.post('/signin', authCtrl.signIn);
router.get('/signout', authCtrl.signOut);

// 회원 정보 등록
router.post('/:id/profile', authCtrl.update);
// 회원 정보 조회
router.get('/:id/profile', authCtrl.read);
module.exports = router;
