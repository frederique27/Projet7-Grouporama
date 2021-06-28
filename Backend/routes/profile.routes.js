const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile.controllers');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

router.get('/users', auth, profileCtrl.getAllUsers);
// router.post('/users', auth, profileCtrl.getOneUser);

router.get('/', auth, profileCtrl.getProfile);
router.post('/setting', auth, multer, profileCtrl.editProfile);
router.delete('/delete', auth, profileCtrl.deleteProfile);

module.exports = router;