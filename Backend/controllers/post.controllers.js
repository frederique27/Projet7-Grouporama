const db = require('../models');
const dbPost = db.Post;
const dbUser = db.User;
const fs = require('fs');

function getUserIdFromRequest(req) {
    return req.headers.authorization.split(' ')[2];
}

// routes GET
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await dbPost.findAll({
            include: [{
                model: db.User,
                attributes: ['username']
            }],
            order: [['createdAt', 'DESC']]
        })
        if (!posts) {
            throw new Error(' Sorry , nothing to fetch');
        }
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getOnePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const onePost = await dbPost.findOne({ 
            where: { id: postId },
            include: [{
                model: db.User, required: true,
                attributes: ['username', 'profilePic']
            }]
        })
        if (!onePost) {
            throw new Error(' Sorry , nothing to fetch');
        }
        res.status(200).send(onePost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//routes POST
exports.createPost = async (req, res) => {
	try {
		let photo = '';
		if(req.file) { 
            photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
        }

		// user
		const findUser = await dbUser.findOne({
			attributes: ['username'],
			where: { id: getUserIdFromRequest(req) },
		});

		if (!findUser) {
			throw new Error("Sorry,we can't find your account");
		}
		// post
		const newPost = await dbPost.create({
			userId: getUserIdFromRequest(req), 
            textPost: req.body.textPost, 
            photo: photo,
		});

		if (!newPost) {
			throw new Error(' Sorry, missing parameters');
		}
		res.status(200).json({ newPost });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};


//routes DELETE
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    dbPost.findOne({ 
        // attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: postId }
    }).then(post => {
        // if (post && post.userId === user.id || user.isAdmin === true) {
            if (post.photo) {
                const filename = post.photo.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                })
            }
                dbPost.destroy({ where: { id: postId } })
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch(error => res.status(403).json({ error }));
        // } else {
        //     return res.status(401).json("unauthorized action");
        // } 
    })  
	  .catch(error => res.status(500).json({ error }));
};


