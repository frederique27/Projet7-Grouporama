const db = require('../config/db.config.js');
const dbLike = db.like;
const dbPost = db.post;

function getUserIdFromRequest(req) {
  return req.headers.authorization.split(' ')[2];
}

//Clés: backend postId (req.body) - frontend (id)
// const postId = req.body.postId;
//   const userId = req.body.userId;
//   where: {
//     userId: userId,
//     id: postId

exports.likePost = async (req, res, next) => {
  // const user = getUserIdFromRequest(req);
  // const user = req.body.userId;
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
              // db.like.create({
              dbLike.create({

                  likes: req.body.likes,
                  userId: getUserIdFromRequest(req),
                  postId: req.body.postId

              })
                  .then(() => res.status(201).json({ message: "vote registred" }))
                  .catch(error => res.status(400).json({ error }));
          } else if (req.body.likes === -1) {
              // db.like.create({
              dbLike.create({

                  likes: req.body.likes,
                  userId: getUserIdFromRequest(req),
                  postId: req.body.postId

              })
                  .then(() => res.status(201).json({ message: "vote registred" }))
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

// exports.likePost = async (req, res, next) => {
//   const postId = req.body.postId;
//   const userId = req.body.userId;

  // const likeFound = await dbLike.findOne({
  //   where: {
  //     userId: userId,
  //     id: postId

  //   }
  // })

  // if (!likeFound) {
  //   await dbLike.create({
  //     id: postId,
  //     userId: userId
  //   })
  //     .then(() => {
  //       dbPost.increment('likes', {
  //         where: {
  //           id: postId
  //         }
  //       })
  //       res.json('post liked')
  //     })
  //     .catch(err => res.send(err))
  // } 
  // else {
  //   await dbLike.destroy({
  //     where: {
  //       id: postId,
  //       userId: userId
  //     }
  //   })
  //     .then(() => {
  //       dbPost.decrement('likes', {
  //         where: {
  //           id: postId
  //         }
  //       })
  //       res.json('Vous avez retiré votre like')
  //     })
  //     .catch(err => res.send(err))
  // }

  // const userLiking = req.body.userId;
  // const postId = req.body.postId;

  // dbLike.query(
  //   "INSERT INTO likes (userLiking, postId) VALUES (?,?)",
  //   [userLiking, postId],
  //   (err, results) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     dbPost.query(
  //       "UPDATE posts SET likes = likes + 1 WHERE id = ?",
  //       postId,
  //       (err2, results2) => {
  //         res.send(results);
  //       }
  //     );
  //   }
  // );
// }

// exports.findAllLikes = (req, res, next) => {
//   const { postId } = req.params

//   dbLike.findAll({ where: { postId: postId } })
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || 'Impossible de récupérer les likes sur ce post'
//       })
//     })
// }
    