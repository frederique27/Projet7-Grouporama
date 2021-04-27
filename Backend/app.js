//Importation des modules
const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path');
const { expressShield } = require("node-shield");
const helmet = require("helmet"); 
require('dotenv').config();

//Importation des routes
const sequelize = require('./util/database');
const userRoutes = require('./routes/user.routes');
// const Post = require('./models/Post');
// const User = require('./models/User');

//Application express 
const app = express();

//CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.use(helmet());

app.use(bodyParser.json());

app.use(expressShield({
  errorHandler: (shieldError, req, res, next) => {
    console.error(shieldError);
    res.sendStatus(400);
  },
}));

// Post.belongsTo(User);
// User.hasMany(Post);



//Connexion DB + sync
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err))

sequelize.sync()
  .then(() => console.log('sync réussie !'))
  .catch(err => console.log('sync échouée: ' + err));

//Routes
app.use('/api/user', userRoutes);


module.exports = app; 