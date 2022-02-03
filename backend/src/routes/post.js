const { Router } = require('express');
const postCtrl = require('../controllers/post');

const router = Router();

// 특정 포스트
router.get('/:id', postCtrl.read);

// 목록, 등록, 수정, 삭제
router.get('/', postCtrl.list);
router.post('/', postCtrl.create);
router.put('/:id', postCtrl.update);
router.delete('/:id', postCtrl.delete);

// 관심 등록, 해제
router.post('/:id/likes', postCtrl.like);
router.delete('/:id/likes', postCtrl.unlike);

module.exports = router;
