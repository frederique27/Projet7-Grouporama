const db = require('../config/db.config.js');
const dbPost = db.post;
const dbUser = db.user;
const dbComment = db.comment;
const dbLike = db.like;
const fs = require('fs');

function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
}

exports.getNotifs = async (req, res, next) => {
//     try {
// 		const comments = await dbComment.findAll({
// 			order: [['createdAt', 'DESC']],
// 			where: { postId: req.params.id }
// 		});
// 		if (comments) {
//       // dbPost.increment('likes')
//       // .then(() => res.status(201).json(comments))
// 			res.status(200).json(comments);
// 		} 
//      dbComment.count({ where: { postId: req.params.id }
//   }).then(c => {
//     console.log("There are " + c + " comments!")
//     // res.status(200).json(c);
//   })
// } catch (error) {
//     res.status(400).json("error comments");
// }

}

exports.deleteAllNotifs = (req, res, next) => {
    
}