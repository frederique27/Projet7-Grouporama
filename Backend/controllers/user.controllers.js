const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let JWTOKEN = process.env.JWTOKEN;
const db = require('../models');
const User = db.User;
const verifInput = require('../middleware/verifInput');

exports.signup = async (req, res, next) => {
	let emailOk = verifInput.validEmail(req.body.email);
    console.log(emailOk)
    let mdpOK = verifInput.validPassword(req.body.password); 
    console.log(mdpOK)
    let usernameOk = verifInput.validUsername(req.body.username);
    console.log(usernameOk)
	let nameOk = verifInput.validNname(req.body.name);
    console.log(usernameOk)
    if (emailOk == true && mdpOK == true && usernameOk == true && nameOk == true) {
		User.findOne({
			attributes: ['email'],
			where: { email: req.body.email },
		})
		.then((user) => {
			if (!user) {
			bcrypt.hash(req.body.password, 10)
			.then(hash => {
				newUser = User.create({
					name: req.body.name,
					username: req.body.username,
					email: req.body.email,
					password: hash,
					// isAdmin: true
                    isAdmin: false
			})
			.then ((newUser) => {
				res.status(201).json({
					userId: newUser.id,
					isAdmin: newUser.isAdmin,
					message : 'User is signed up'
				})  
			}) 
			.catch(err =>  res.status(500).send("Fail! Error -> " + err));
			})
			.catch(error => res.status(500).send( error ))
		} else {
			return res.status(409).send("email déjà utilisé");
		}
		})
		.catch(error => res.status(500).json({ error }));
	} else {
		console.log('error user input')
	}
};

exports.signin = (req, res, next) => {	
	User.findOne({ 
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send("Aucun utilisateur trouvé");
		}

		let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send("Mot de passe invalide");
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
            isAdmin: user.isAdmin,
		});
		
	}).catch(err => {
		res.status(500).send({reason: err.message});
	});
};