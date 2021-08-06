const db = require('../models');
const User = db.User;
const Like = db.Like;
const Post = db.Post;
const Comment = db.Comment;
const fs = require('fs');


function getUserIdFromRequest(req) {
	return req.headers.authorization.split(' ')[2]; 
}

function deleteProfileMedia (path) {
	const filename = path.split('/images/')[1];
	fs.unlink(`images/${filename}`, function (err) {
		if (err) return console.log(err);
	});
};

exports.getProfile = async (req, res, next) => {
	await User.findOne({
	  where: { id: getUserIdFromRequest(req)},
	})
	  .then(profile => res.status(200).json(profile))
	  .catch(error => res.status(500).json({ error }));
};

exports.editPhoto = async (req, res, next) => {
	try {
	  	await User.findOne({ 
		  where: { id: getUserIdFromRequest(req) } 
		})
		.then(async profile => {
			if (req.file) {
				if (profile.profilePic) {
					deleteProfileMedia(profile.profilePic);
				}
				profile.update({
					profilePic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
				})
					.then(() => res.status(201).json({ message: `profile updated` }))
					.catch(error => res.status(400).json({ error }));
			} 
		}).catch(() => res.status(404).json('profile not found'));
	} catch (error) {
	  res.status(400).json({ error });
	}
};

exports.deleteProfile = (req, res, next) => {
	Like.destroy({where: {userId: getUserIdFromRequest(req)}})
	.then(() => 
	  Comment.destroy({where: {userId: getUserIdFromRequest(req)}})
	  .then(() => 
		Post.findAll({where: {userId: getUserIdFromRequest(req)}})
		  .then(
			(posts) => {
			  posts.forEach(
				(post) => {
				  Comment.destroy({where: {postId: post.id}})
				  Like.destroy({where: {postId: post.id}})
				  Post.destroy({where: {id: post.id}})
				}
			  )
			}
		  )
		  .then(() =>
		  User.findOne({ where: {id: getUserIdFromRequest(req)} })
			.then(user => {
			  const filename = user.profilePic.split('/images/')[1];
			  fs.unlink(`images/${filename}`, () => {
				User.destroy({ where: {id: getUserIdFromRequest(req)} })
				.then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
			  })
			})
		  )
		)
	  )
	.catch(error => res.status(400).json({ error }));
  };


