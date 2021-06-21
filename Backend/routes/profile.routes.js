const express = require('express');
const router = express.Router();
const profileCtrl = require('../controllers/profile.controllers');
const auth = require('../middleware/auth');

router.get('/users', auth, profileCtrl.getAllUsers);

module.exports = router;