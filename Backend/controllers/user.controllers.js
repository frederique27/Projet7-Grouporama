const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let JWTOKEN = process.env.JWTOKEN;
const db = require('../config/db.config.js');
const User = db.user;

exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10)
	.then(hash => {
		User.create({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: hash
		})
	.then (user => {
                res.status(201).json({
					message : 'Inscription effectuée.'
                })  
    }) 
        .catch(err =>  res.status(500).send("Fail! Error -> " + err));
	})
	.catch(error => res.status(500).json({ error }))
};

exports.signin = (req, res, next) => {
    console.log("Sign-In");
	
	User.findOne({ 
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		let token = jwt.sign
		({ userId: user.id },  
			JWTOKEN,
		{ expiresIn: 86400 });
		res.setHeader('Authorization', 'Bearer ' + token);
		res.status(200).send({ 
			auth: true, 
			authToken: token + ' ' + user.id,
			userId: user.id,
		});
		
	}).catch(err => {
		res.status(500).send({reason: err.message});
	});
};