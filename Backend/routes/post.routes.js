const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');
const multer = require ('../middleware/multer-config')

router.get('/', postCtrl.getAllPosts);
router.post('/', multer, postCtrl.createPost);

module.exports = router;