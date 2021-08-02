const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile.controllers');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

router.get('/', auth, profileCtrl.getProfile);
router.put('/', auth, multer, profileCtrl.editPhoto);
router.delete('/', auth, profileCtrl.deleteProfile);

module.exports = router;