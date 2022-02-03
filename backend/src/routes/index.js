const { Router } = require('express');
const authRouter = require('./auth');
const postRouter = require('./post');

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', postRouter);

module.exports = router;
