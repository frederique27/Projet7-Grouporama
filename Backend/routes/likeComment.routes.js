const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like.controllers');
const commentCtrl = require('../controllers/comment.controllers')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

//LIKE//
router.post('/like', auth, likeCtrl.likePost);

//COMMENT//
router.post('/comment', auth, commentCtrl.createComment);
router.put('/comment', auth, commentCtrl.modifyComment);
router.delete('/comment', auth, commentCtrl.deleteComment);


module.exports = router;