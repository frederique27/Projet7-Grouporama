const db = require('../config/db.config.js');
const dbLike = db.like;
const dbPost = db.post;
const dbUser = db.user;
const dbComment = db.comment;
const jwt = require('jsonwebtoken');
const fs = require('fs');

function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
  }

exports.createComment = (req, res, next) => {
  let newPost = {}; 
  newPost = { userId: getUserIdFromRequest(req), textComment: req.body.textComment, postId: req.body.postId }
  const user = getUserIdFromRequest(req);
  // const profile = await db.user.findByPk(user);

  if (!user) { return res.status(404).json('user not found'); }

  dbComment.create(newPost)
      .then(() => res.status(201).json({ message: `comment registered` }))
      .catch(() => res.status(404).json("publication not found"));
}

exports.modifyComment = (req, res, next) => {

}

exports.deleteComment = (req, res, next) => {

}