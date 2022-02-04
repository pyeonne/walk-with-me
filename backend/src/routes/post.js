const { Router } = require('express');
const postCtrl = require('../controllers/post');
const { checkOwnPost } = require('../middlewares/post');
const { checkLogin } = require('../middlewares/auth');

const router = Router();

// 특정 포스트
router.get('/:id', postCtrl.read);

// 목록, 등록, 수정, 삭제
router.get('/', postCtrl.list);
router.post('/', checkLogin, postCtrl.create);
router.put('/:id', checkOwnPost, postCtrl.update);
router.delete('/:id', checkOwnPost, postCtrl.delete);

// 관심 등록, 해제
router.post('/:id/likes', checkLogin, postCtrl.like);
router.delete('/:id/likes', checkLogin, postCtrl.unlike);

// 가입 신청
router.post('/:id', checkLogin, postCtrl.apply);

// 회원 관리 페이지
router.get('/:id/management', checkLogin, checkOwnPost, postCtrl.management);

// 가입 신청 수락, 거절
router.post(
  '/:id/management/:userId/allow',
  checkLogin,
  checkOwnPost,
  postCtrl.allow
);

router.post(
  '/:id/management/:userId/deny',
  checkLogin,
  checkOwnPost,
  postCtrl.deny
);

// 회원 퇴출
router.delete(
  '/:id/management/:userId',
  checkLogin,
  checkOwnPost,
  postCtrl.kick
);

module.exports = router;
