const db = require('../config/db.config.js');
const User = db.user;

function getUserIdFromRequest(req) {
	return req.headers.authorization.split(' ')[2]; 
  }

exports.getAllUsers = async (req, res, next) => {
	await User.findAll({
	})
	  .then(users => res.status(200).json(users))
	  .catch(error => res.status(400).json({ error }));
  };

  exports.getProfile = async (req, res, next) => {
	await User.findOne({
	  where: { id: getUserIdFromRequest(req)},
	})
	  .then(profile => res.status(200).json(profile))
	  .catch(error => res.status(500).json({ error }));
  };

//   exports.editProfile = async (req, res, next) => {
// 	await User.findAll({
// 	})
// 	  .then(users => res.status(200).json(users))
// 	  .catch(error => res.status(400).json({ error }));
//   };