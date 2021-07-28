const db = require('../models');
const dbComment = db.Comment;
const jwt = require('jsonwebtoken'); 
const fs = require('fs');

function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
  } 
  // postId: req.body.postId 
exports.createComment = (req, res, next) => {
  let newComment = {};
  newComment = { userId: getUserIdFromRequest(req), 
    textComment: req.body.textComment, 
    postId: req.params.id,
    // comments: comments
  }
  const user = getUserIdFromRequest(req);
 
  if (!user) { 
    return res.status(404).json('user not found'); 
  }
  dbComment.create(newComment) 
      .then(() => res.status(201).json({ message: `comment registered` }))
      .catch(() => res.status(404).json("publication not found"));
  // dbComment.count({ where: { postId: req.params.id }
  // }).then(c => {
  //   console.log("There are " + c + " comments!")
  // })
}

exports.getComment = async (req, res, next) => {
	try { 
		const comments = await dbComment.findAll({
			order: [['createdAt', 'DESC']],
			where: { postId: req.params.id },
      include: [{
        model: db.User, required: true, 
        as: 'user' 
        // model: db.User, required: true,
        // attributes: ['username', 'profilePic']
    }]
		});
		if (comments) {
      // dbPost.increment('likes')
      // .then(() => res.status(201).json(comments))
			res.status(200).json(comments);
		} 
    //  dbComment.count({ where: { postId: req.params.id }
  // }).then(c => {
    // console.log("There are " + c + " comments!")
    // res.status(200).json(c);
  // })
    else {
			throw new Error("There are no comments");
		}
    // dbPost.increment('likes', {where: {postId: req.body.postId}})
    // .then(() => res.status(201).json({ message: `comment registered` }))
    // .catch(() => res.status(404).json("publication not found"));
    // dbPost.findOne({
    //   where: { 
    //     postId: req.params.id,
    //   }
    // }).then(option => {
    //   return option.increment('likes'); // assumes `option` always exists
    // }).then(option => {
    //   return option.reload();
    // }).then(option => {
    //   console.log(option);
    //   res.json(option);
    // });
	} catch (error) {
		res.status(400).json("error comments");
	}
};

exports.modifyComment = (req, res, next) => {

}

exports.deleteComment = (req, res, next) => {
  // dbPost.findOne({
  //   where: { 
  //     postId: req.params.id,
  //   }
  // }).then(option => {
  //   return option.increment('likes'); // assumes `option` always exists
  // }).then(option => {
  //   return option.reload();
  // }).then(option => {
  //   res.json(option);
  // });
//   const jane = await User.create({ name: "Jane", age: 100 });
// const incrementResult = await dbPost.increment('likes');
// try {
//   const comments = await dbComment.findAll({
//     order: [['createdAt', 'DESC']],
//     where: { postId: req.params.id }
//   });
//   if (comments) {
//     await dbPost.increment('likes')
//     res.status(200).json(comments);
//   } else {
//     throw new Error("There are no comments");
//   }
// } catch (error) {
//   res.status(400).json("error comments");
// }

}