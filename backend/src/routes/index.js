const { Router } = require('express');
const authRouter = require('./auth');
const postRouter = require('./post');
const { setUser } = require('../middlewares/auth');

const router = Router();

router.use('/auth', authRouter);
router.use('/posts', setUser, postRouter);

module.exports = router;
