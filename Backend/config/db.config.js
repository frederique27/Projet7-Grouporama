const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, { 
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
 
  pool: {
    max: env.max,
    min: env.min, 
    acquire: env.acquire,
    idle: env.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.post = require('../models/post.model.js')(sequelize, Sequelize);
db.like = require('../models/like.model.js')(sequelize, Sequelize);
db.comment = require('../models/comment.model.js')(sequelize, Sequelize);

module.exports = db;