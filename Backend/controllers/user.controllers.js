const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let JWTOKEN = process.env.JWTOKEN;
const db = require('../config/db.config.js');
const User = db.user;

exports.signup = (req, res, next) => {
    User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
    }).then (user => {
                res.status(201).json({
                    token :jwt.sign(
                        { userId: user._id },
                        JWTOKEN,
                        { expiresIn: '24h' }
                    ), 
                }) 
            }) 
        .catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
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
		
		let token = jwt.sign({ id: user.id }, JWTOKEN, {
		  expiresIn: 86400 // expires in 24 hours
		});
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send({reason: err.message});
	});
};