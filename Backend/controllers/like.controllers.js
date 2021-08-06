const db = require('../models');
const dbLike = db.Like;
const dbPost = db.Post;
dbUser = db.User;

function getUserIdFromRequest(req) {
  return req.headers.authorization.split(' ')[2]; 
}


// exports.likePost = async (req, res, next) => {
//   const postId = req.body.postId;
//   const userId = getUserIdFromRequest(req);
//   const dblike = dbLike.findOne({ 
//       where: { id: postId, userId: userId },
//     //   include: [{ model: dbUser, attributes: ["id, username"] }] 
//     });

//   if (!userId) { return res.status(401).json('thanks to renewal your login access'); };
//   if (!dblike) { return res.status(400).json('bad request'); };

//   const like = await dblike;

//   try {
//       if (like !== null) { // modification of previous vote
//           if (req.body.likes === 0 && req.body.likes !== like.likes) { // if 0, user unvoted
//               like.update({
//                   likes: req.body.likes
//               })
//                   .then(() => res.status(201).json({ message: "publication unvoted" }))
//                   .catch(error => res.status(400).json({ error }));
//           } else if (req.body.likes === -1 && req.body.likes !== like.likes) { // if -1 , user now dislike
//               like.update({
//                   likes: req.body.likes
//               })
//                   .then(() => res.status(201).json({ message: "liked to disliked" }))
//                   .catch(error => res.status(400).json({ error }));
//           } else if (req.body.likes === 1 && req.body.likes !== like.likes) {
//               like.update({
//                   likes: req.body.likes
//               })
//                   .then(() => res.status(201).json({ message: "disliked to liked" }))
//                   .catch(error => res.status(400).json({ error }));
//           } else {
//               res.send('already liked');
//           }
//       } else { // first like
//           if (req.body.likes === 1) {
//               dbLike.create({

//                   likes: req.body.likes,
//                   userId: getUserIdFromRequest(req),
//                   postId: req.body.postId

//               })
//                   .then(() => res.status(201).json({ message: "vote registered" }))
//                   .catch(error => res.status(400).json({ error }));
//           } else if (req.body.likes === -1) {
//               dbLike.create({
//                   likes: req.body.likes,
//                   userId: getUserIdFromRequest(req),
//                   postId: req.body.postId
//               })
//                   .then(() => res.status(201).json({ message: "vote registered" }))
//                   .catch(error => res.status(400).json({ error }));
//           } else {
//               console.log('unauthorized value');
//               res.send('unauthorized value');

//           }
//       }
//   } 
//   catch (error) {
//       console.log(error);
//       process.exit(0);
//   }
// }

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
    