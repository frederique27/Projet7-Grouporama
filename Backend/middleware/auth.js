const jwt = require('jsonwebtoken');
require('dotenv').config();
let JWTOKEN = process.env.JWTOKEN;

module.exports = (req, res, next) => {
  try {
    const myToken = jwt.verify(req.headers.authorization.split(' ')[1], JWTOKEN);
    const userId = req.headers.authorization.split(' ')[2];
    if(myToken.userId && userId && myToken.userId == userId) { 
      next()
    } else { throw {err}; }
  } catch {
    res.status(401).send({message: 'Un problème d\'authentification est survenu.'})
  }
}