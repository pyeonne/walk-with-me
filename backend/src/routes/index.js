const { Router } = require('express');
const authRouter = require('./auth');
const postRouter = require('./post');
const imageRouter = require('./image');

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/image', imageRouter);

module.exports = router;
