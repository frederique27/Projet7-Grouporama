const db = require('../models');
const User = db.User;
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
    User.findOne({ 
        where: { id: getUserIdFromRequest(req) }
    })
	.then(profile => {
		if (profile.profilePic) {
			deleteProfileMedia(profile.profilePic);
		}
		User.destroy({ 
			where: { id: getUserIdFromRequest(req) } 
		})
		.then(() => res.status(200).json({ message: 'Post supprimé !' }))
		.catch(error => res.status(403).json({ error }));
	})
	.catch(error => res.status(500).json({ error }));
};


