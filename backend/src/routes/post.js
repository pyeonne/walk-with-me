const { Router } = require('express');
const postCtrl = require('../controllers/post');
const {
  checkOwnPost,
  checkPostId,
  checkPostExist,
} = require('../middlewares/post');
const { checkLogin, checkUserId } = require('../middlewares/auth');
const upload = require('../utils/multer');

const router = Router();
const postRouter = Router();
const manageRouter = Router();

// 포스트 사진 등록
router.post('/images', upload.single('img'), postCtrl.registerImage);

router.use('/:id', checkPostId, checkPostExist, postRouter);
router.use(
  '/:id/management/:userId',
  checkUserId,
  checkLogin,
  checkOwnPost,
  manageRouter
);

// 특정 포스트
postRouter.get('/', postCtrl.read);

// 목록, 등록, 수정, 삭제
router.get('/', postCtrl.list);
router.post('/', checkLogin, postCtrl.create);
postRouter.put('/', checkLogin, checkOwnPost, postCtrl.update);
postRouter.delete('/', postCtrl.delete);

// 모집 상태 변경
postRouter.put('/status', checkLogin, checkOwnPost, postCtrl.changeStatus);

// 관심 등록, 해제
postRouter.post('/likes', checkLogin, postCtrl.like);
postRouter.delete('/likes', checkLogin, postCtrl.unlike);

// 가입 신청, 취소
postRouter.post('/apply', checkLogin, postCtrl.apply);
postRouter.post('/cancel', checkLogin, postCtrl.cancel);

// 회원 관리 페이지
postRouter.get('/management', checkLogin, checkOwnPost, postCtrl.management);

// 가입 신청 수락, 거절
manageRouter.post('/allow', postCtrl.allow);
manageRouter.post('/deny', postCtrl.deny);

// 회원 퇴출
manageRouter.delete('/kick', postCtrl.kick);

module.exports = router;
