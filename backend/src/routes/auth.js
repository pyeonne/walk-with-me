const { Router } = require('express');
const authCtrl = require('../controllers/auth');

const router = Router();

router.post('/signup', authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
router.post('/signout', authCtrl.signOut);

module.exports = router;
