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
    const commentObject = JSON.parse(req.body.comment);
    // const isValid = await commentSchema.validateAsync(commentObject);
    const user = getUserIdFromRequest(req);
    // const profile = await db.user.findByPk(user);

    if (!commentObject) { return res.status(404).json('invalid req object'); }
    if (!user) { return res.status(404).json('user not found'); }

    dbComment.create({
        textComment: commentObject.body,
        userId: user,
        postId: req.body.id_publication,
    })
        .then(() => res.status(201).json({ message: `comment registred` }))
        .catch(() => res.status(404).json("publication not found"));
}

exports.modifyComment = (req, res, next) => {

}

exports.deleteComment = (req, res, next) => {

}