const db = require('../models');
const dbComment = db.Comment;
const jwt = require('jsonwebtoken'); 
const fs = require('fs');

function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
} 

exports.createComment = (req, res, next) => {
  let newComment = {};
  newComment = { 
    userId: getUserIdFromRequest(req), 
    textComment: req.body.textComment, 
    postId: req.params.id,
  }
  const user = getUserIdFromRequest(req);
  if (!user) { 
    return res.status(404).json('user not found'); 
  }
  dbComment.create(newComment) 
      .then(() => res.status(201).json({ message: `comment registered` }))
      .catch(() => res.status(404).json("publication not found"));
}

exports.getComment = async (req, res, next) => {
	try { 
		const comments = await dbComment.findAll({
			order: [['createdAt', 'DESC']],
			where: { postId: req.params.id },
			include: [{
			model: db.User, required: true, 
			as: 'user',
		}]
		});
		if (comments) {
			res.status(200).json(comments);
		} 
		else {
			throw new Error("There are no comments");
		}
    } catch (error) {
      res.status(400).json("error comments");
	}

}