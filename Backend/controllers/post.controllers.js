const db = require('../config/db.config.js');
const dbPost = db.post;

function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
}

//routes GET
exports.getAllPosts = (req, res, next) => {
    dbPost.findAll({order: [ 
        ['createdAt', 'DESC'],
    ]})
      .then(post => {
          console.log(post);
          res.status(200).json(post);
        //   res.status(200).json({post});
      })
      .catch(error => res.status(400).json({ error }));
    };


//routes POST
exports.createPost = (req, res, next) => {
    dbPost.create({
        textPost: req.body.textPost,
        ownerId: getUserIdFromRequest(req), 
        photo: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
    }) 
        .then(post => res.status(201).json({ post }))
        .catch(error => res.status(400).json({ error }))
}