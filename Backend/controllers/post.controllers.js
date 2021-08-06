const db = require('../models');
const dbPost = db.Post;
const dbUser = db.User;
const dbComment = db.Comment;
const dbLike = db.Like;
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
                attributes: ['username', 'isAdmin']
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
            // include: [{
            //     model: db.User, required: true,
            //     attributes: ['id', 'username', 'profilePic']
            // }]
            include: [{
                model: dbUser,
                required: true,
                attributes: ['id', 'username', 'profilePic']
            },
             {
                model: dbLike,
                required: false,
                attributes: ['likes', 'userId', 'postId']
            }],
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


// routes DELETE
exports.deletePost = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const user = await dbUser.findOne({ 
            where: { id: getUserIdFromRequest(req) },
        })
        dbPost.findOne({ 
            where: { id: postId },
        })
            .then(publication => {
                if (publication.userId === user.id || user.admin) {
                    dbComment.destroy({ where: { postId: publication.id } })
                        .then(() => {
                            dbLike.destroy({ where: { postId: publication.id } })
                                .then(() => {
                                    if (publication.photo) {
                                        const filename = publication.photo.split('/images/')[1];
                                        fs.unlink(`images/${filename}`, (err) => {
                                            if (err) throw err;
                                        })
                                    }
                                    publication.destroy()
                                        .then(() => res.status(200).json('publication deleted with success'))
                                        .catch(() => res.status(500).json("internal server error 1"));
                                })
                                .catch(() => res.status(500).json("internal server error 2"));
                        })
                        .catch(() => res.status(500).json("internal server error 3"));
                } else {
                    return res.status(401).json("unauthorized action");
                }
            })
            .catch(() => res.status(500).json("internal server error 4"));
    } catch (error) {
        return res.status(500).json("internal server error 5");
    }
};


