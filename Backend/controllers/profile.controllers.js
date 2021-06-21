const db = require('../config/db.config.js');
const User = db.user;

exports.getAllUsers = async (req, res, next) => {
	await User.findAll({
	  attributes: ['name', 'username', 'email']
	})
	  .then(users => res.status(200).json(users))
	  .catch(error => res.status(400).json({ error }));
  };