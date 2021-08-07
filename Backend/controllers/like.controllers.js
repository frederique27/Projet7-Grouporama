const db = require('../models');
const dbLike = db.Like;
const dbPost = db.Post;
dbUser = db.User;

function getUserIdFromRequest(req) {
  return req.headers.authorization.split(' ')[2]; 
}

exports.likePost = async (req, res, next) => {
      try{
        const likeObject = req.body;
          await dbLike.findAll({where: {
            postId: req.params.id,
            userId: getUserIdFromRequest(req)
            }})
            .then(likes => {
              if(likes.length === 0) {
                const like = new dbLike({
                  ...likeObject
                });
                like.save()
                .then(() => {
                  dbLike.findAll({
                    where: {postId: req.params.id}
                  }).then(likes => {
                    res.status(200).json({ likes: likes.length}); //
                  })
                })
                .catch(error => res.status(400).json({ error }));           
              } else {
                dbLike.destroy({ where: {
                  postId: req.params.id,
                  userId: getUserIdFromRequest(req) }})
                  .then(() => {
                    dbLike.findAll({
                      where: {postId: req.params.id}
                    }).then(likes => {
                      res.status(200).json({ likes: likes.length});
                    })
                  })
                  .catch(error => res.status(400).json({ error }));
              }
            }
          )
          } catch (error) {
                  console.log(error);
              }
      }

exports.getLikes = async (req, res, next) => {
    try {
        const likes = await dbLike.findAll({ 
			where: { 
				postId: req.params.id,
        		likes: 1
			}
		})
        if (likes) {
            res.status(200).json(likes);
        }
    } catch (error) {
        res.status(400).json("error likes");
    }
};

exports.getDislikes = async (req, res, next) => {
    try {
        const dislikes = await dbLike.findAll({
			where: {
        		postId: req.params.id,
        		likes: -1
        	}
		})
        if (dislikes) {
            res.status(200).json(dislikes);
        }
    } catch (error) {
        res.status(400).json("error dislikes");
    }
}
    