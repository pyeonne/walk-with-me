const authCtrl = require('../controllers/auth');
const router = require('express').Router();
const { checkLogin } = require('../middlewares/auth');

// 소셜 로그인
router.get('/google', authCtrl.google);
router.get('/google/callback', authCtrl.googleCallback);

// 카카오
router.get('/kakao', authCtrl.kakao);
router.get('/kakao/callback', authCtrl.kakaoCallback);

router.get('/login-success', authCtrl.loginSuccess);

// 로컬 로그인
router.post('/signup', authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
router.get('/signout', authCtrl.signOut);

// 회원 정보 등록
router.post('/:id/profile', authCtrl.update);

//회원 정보 수정
router.put('/:id/profile', authCtrl.modify);

// 회원 정보 조회
router.get('/:id/profile', checkLogin, authCtrl.read);

// 비밀번호 찾기
router.post('/find-password', authCtrl.findPassword);

// 비밀번호 변경
router.patch('/:id/profile/password', checkLogin, authCtrl.changePassword);

module.exports = router;
