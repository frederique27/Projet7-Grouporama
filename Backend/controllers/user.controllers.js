const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let JWTOKEN = process.env.JWTOKEN;
const db = require('../models');
const User = db.User;
const verifInput = require('../middleware/verifInput');

function getUserIdFromRequest(req) {
	return req.headers.authorization.split(' ')[2]; 
}

// exports.signup = async (req, res, next) => {
// 	let emailOk = verifInput.validEmail(req.body.email);
//     console.log(emailOk)
//     let mdpOK = verifInput.validPassword(req.body.password); 
//     console.log(mdpOK)
//     let usernameOk = verifInput.validUsername(req.body.username);
//     console.log(usernameOk)
// 	let nameOk = verifInput.validNname(req.body.name);
//     console.log(usernameOk)
//     if (emailOk == true && mdpOK == true && usernameOk == true && nameOk == true) {
// 		User.findOne({
// 			attributes: ['email'],
// 			where: { email: req.body.email },
// 		  })
// 		  .then((user) => {
// 			if (!user) {
// 			bcrypt.hash(req.body.password, 10)
// 			.then(hash => {
// 				User.create({
// 					name: req.body.name,
// 					username: req.body.username,
// 					email: req.body.email,
// 					password: hash
// 				})
// 			.then (() => {
// 						res.status(201).json({
// 							message : 'User is signed up'
// 						})  
// 			}) 
// 				.catch(err =>  res.status(500).send("Fail! Error -> " + err));
// 			})
// 			.catch(error => res.status(500).send( error ))
// 		} else {
// 			return res.status(409).send("email déjà utilisé");
// 		  }
// 		})
// 		.catch(error => res.status(500).json({ error }));
// 	} 
// 	else {
// 		console.log('error user input')
// 	}
// };
exports.signup = (req, res, next) => {
    // éléments de la requète
    const name = req.body.name;
    const username =  req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // vérification que tous les champs sont remplis
    // if(firstname === null || firstname === '' || lastname === null || lastname === '' 
    //     || email === null || email === '' || password === null || password === '') {
    //     return res.status(400).json({'error': "Veuillez remplir l'ensemble des champs du formulaire"});
    // }

 
    // vérification si l'user existe dans DB
    User.findOne({
        attributes: ['email'],
        where: {email: email}
    })
    .then((userFound) =>{
        // si l'utilisateur n'existe pas la DB
        if(!userFound) {
            // Hash du mot de passe avec bcrypt
            bcrypt.hash(password, 10)
            .then(hash => {
                // Création du nouvel utilisateur
                const user = new User({
                    name: name,
                    username: username,
                    email: email,
                    password: hash
                })
                // Sauvegarde dans la base de données
                user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
            })
        } else if(userFound) {
            return res.status(409).json({error: "L'utilisateur existe déjà !"})
        }
    })
    .catch(error => res.status(500).json({ error }));
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
		});
		
	}).catch(err => {
		res.status(500).send({reason: err.message});
	});
};