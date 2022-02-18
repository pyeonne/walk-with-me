const { Router } = require('express');
const imageCtrl = require('../controllers/image');
const upload = require('../utils/multer');

const router = Router();

router.post('/', upload.single('img'), imageCtrl.image)

module.exports = router;