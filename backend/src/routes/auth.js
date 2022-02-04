const authCtrl = require('../controllers/auth');
const router = require('express').Router();
const { checkLogin } = require('../middlewares/auth');
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
router.post('/signin', authCtrl.signIn);
router.get('/signout', authCtrl.signOut);

// 회원 정보 등록
router.post('/:id/profile', checkLogin, authCtrl.update);
// 회원 정보 조회
router.get('/:id/profile', authCtrl.read);
// 비밀번호 찾기
router.post('/find-password', authCtrl.findPassword);

// 비밀번호 변경
router.patch('/:id/profile/password', checkLogin, authCtrl.changePassword);

module.exports = router;
