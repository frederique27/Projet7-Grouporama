  
'use strict';
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

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

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.post = require('../models/post.model.js')(sequelize, Sequelize);
db.like = require('../models/like.model.js')(sequelize, Sequelize);
db.comment = require('../models/comment.model.js')(sequelize, Sequelize);

module.exports = db;