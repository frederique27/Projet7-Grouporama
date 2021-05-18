const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');

router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);

module.exports = router;