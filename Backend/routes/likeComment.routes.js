const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like.controllers');
const commentCtrl = require('../controllers/comment.controllers')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

//LIKE//
router.post('/:id/like', auth, likeCtrl.likePost);
router.get('/:id/like', auth, likeCtrl.getLikes);

//COMMENT//
router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment', auth, commentCtrl.getComment);
router.put('/comment', auth, commentCtrl.modifyComment);
router.delete('/comment', auth, commentCtrl.deleteComment);


module.exports = router;