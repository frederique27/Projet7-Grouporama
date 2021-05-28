const db = require('../config/db.config.js');
const dbPost = db.post;
const dbUser = db.user;
const fs = require('fs');

function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
}

//routes GET
exports.getAllPosts = (req, res, next) => {
    dbPost.findAll({order: [ 
        ['createdAt', 'DESC']
    ],
    })
      .then(post => {
          console.log(post);
          res.status(200).json(post); 
      })
      .catch(error => res.status(402).json({ error }));
    };


//routes POST
exports.createPost = (req, res, next) => {
    let newPost = {}; let photo = '';
    if(req.file) { photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; }
    newPost = { userId: getUserIdFromRequest(req), textPost: req.body.textPost, photo: photo }
    
    dbPost.create(newPost)
        .then(() => {
            res.status(201).send({message : 'Votre post a correctement été créé.'});
        })
        .catch(err => { res.status(500).send({message: "Une erreur est survenue (" + err + ")"}) });
}


//routes DELETE
exports.deletePost = (req, res, next) => {
    dbPost.findOne({ 
        where: { id: req.params.id }
    }).then(post => {
          if (post.photo) {
            const filename = post.photo.split('/images/')[1]; //récupère 2e élément du tableau (nom du fichier)
            fs.unlink(`images/${filename}`, (err) => {
                if (err) throw err;
            })
            dbPost.destroy({ where: { id: req.params.id } }) //ensuite supprime de la base de donnée
			.then(() => res.status(200).json({ message: 'Post supprimé !' }))
			.catch(error => res.status(403).json({ error }));
        }
		})
	  .catch(error => res.status(500).json({ error }));
};