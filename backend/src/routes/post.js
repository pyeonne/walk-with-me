const { Router } = require('express');
const postCtrl = require('../controllers/post');
const {
  checkObjectId,
  checkLogin,
  checkOwnPost,
} = require('../middlewares/post');

const router = Router();

// 특정 포스트
router.get('/:id', checkObjectId, postCtrl.read);

// 목록, 등록, 수정, 삭제
router.get('/', postCtrl.list);
router.post('/', checkLogin, postCtrl.create);
router.put('/:id', checkObjectId, checkOwnPost, postCtrl.update);
router.delete('/:id', checkObjectId, checkOwnPost, postCtrl.delete);

// 관심 등록, 해제
router.post('/:id/likes', checkObjectId, checkLogin, postCtrl.like);
router.delete('/:id/likes', checkObjectId, checkLogin, postCtrl.unlike);

// 가입 신청
router.post('/:id', checkObjectId, checkLogin, postCtrl.apply);

// 회원 관리 페이지
router.get(
  '/:id/management',
  checkObjectId,
  checkLogin,
  checkOwnPost,
  postCtrl.management
);

// 가입 신청 수락, 거절
router.post(
  '/:id/management/:userId/allow',
  checkObjectId,
  checkLogin,
  checkOwnPost,
  postCtrl.allow
);

router.post(
  '/:id/management/:userId/deny',
  checkObjectId,
  checkLogin,
  checkOwnPost,
  postCtrl.deny
);

// 회원 퇴출
router.delete(
  '/:id/management/:userId',
  checkObjectId,
  checkLogin,
  checkOwnPost,
  postCtrl.kick
);

module.exports = router;
