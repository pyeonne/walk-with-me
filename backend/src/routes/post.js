const { Router } = require('express');
const postCtrl = require('../controllers/post');
const { checkObjectId, checkLogin, checkUser } = require('../middlewares/post');

const router = Router();

// 특정 포스트
router.get('/:id', checkObjectId, postCtrl.read);

// 목록, 등록, 수정, 삭제
router.get('/', postCtrl.list);
router.post('/', checkLogin, postCtrl.create);
router.put('/:id', checkObjectId, checkUser, postCtrl.update);
router.delete('/:id', checkObjectId, checkUser, postCtrl.delete);

// 관심 등록, 해제
router.post('/:id/likes', checkLogin, checkObjectId, postCtrl.like);
router.delete('/:id/likes', checkLogin, checkObjectId, postCtrl.unlike);

// 가입 신청
router.post('/:id', checkLogin, checkObjectId, postCtrl.apply);

// 회원 관리 페이지
router.get(
  '/:id/management',
  checkLogin,
  checkObjectId,
  checkUser,
  postCtrl.management
);

// 가입 신청 수락, 거절
router.post(
  '/:id/management/:userId/allow',
  checkLogin,
  checkObjectId,
  checkUser,
  postCtrl.allow
);

// 회원 퇴출
module.exports = router;
