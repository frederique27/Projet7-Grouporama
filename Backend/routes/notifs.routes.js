const express = require('express');
const router = express.Router();
const notifCtrl = require('../controllers/notifs.controllers');
const auth = require('../middleware/auth')

router.get('/notif', auth, notifCtrl.getNotifs);
router.delete('/notif', auth, notifCtrl.deleteAllNotifs);



module.exports = router;