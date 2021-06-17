const db = require('../config/db.config.js');
const dbLike = db.like;
const dbPost = db.post;

function getUserIdFromRequest(req) {
  return req.headers.authorization.split(' ')[2]; 
}


exports.likePost = async (req, res, next) => {
  const postId = req.body.postId;
  const userId = getUserIdFromRequest(req);
  const dblike = dbLike.findOne({ where: { 
    id: postId, userId: userId } });

  if (!userId) { return res.status(401).json('thanks to renewal your login access'); };
  if (!dblike) { return res.status(400).json('bad request'); };

  const like = await dblike;

  try {
      if (like !== null) { // modification of previous vote
          if (req.body.likes === 0 && req.body.likes !== like.likes) { // if 0, user unvoted
              like.update({
                  likes: req.body.likes
              })
                  .then(() => res.status(201).json({ message: "publication unvoted" }))
                  .catch(error => res.status(400).json({ error }));
          } else if (req.body.likes === -1 && req.body.likes !== like.likes) { // if -1 , user has changed his point of view and now dislike
              like.update({
                  likes: req.body.likes
              })
                  .then(() => res.status(201).json({ message: "liked to disliked" }))
                  .catch(error => res.status(400).json({ error }));
          } else if (req.body.likes === 1 && req.body.likes !== like.likes) {
              like.update({
                  likes: req.body.likes
              })
                  .then(() => res.status(201).json({ message: "disliked to liked" }))
                  .catch(error => res.status(400).json({ error }));
          } else {
              res.send('already liked');
          }
      } else { // first like
          if (req.body.likes === 1) {
              dbLike.create({

                  likes: req.body.likes,
                  userId: getUserIdFromRequest(req),
                  postId: req.body.postId

              })
                  .then(() => res.status(201).json({ message: "vote registered" }))
                  .catch(error => res.status(400).json({ error }));
          } else if (req.body.likes === -1) {
              dbLike.create({
                  likes: req.body.likes,
                  userId: getUserIdFromRequest(req),
                  postId: req.body.postId
              })
                  .then(() => res.status(201).json({ message: "vote registered" }))
                  .catch(error => res.status(400).json({ error }));
          } else {
              console.log('unauthorized value');
              res.send('unauthorized value');

          }
      }
  } 
  catch (error) {
      console.log(error);
      process.exit(0);
  }
}
    