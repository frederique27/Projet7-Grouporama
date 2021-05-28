const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');
const multer = require ('../middleware/multer-config')
const auth = require('../middleware/auth')


router.get('/', auth, postCtrl.getAllPosts);
router.post('/new', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;