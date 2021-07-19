//Importation des modules
const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path');
const { expressShield } = require("node-shield");
const helmet = require("helmet"); 
require('dotenv').config();

//Importation des routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const likeCommentRoutes = require('./routes/likeComment.routes');
const profileRoutes = require('./routes/profile.routes');
const notifsRoutes = require('./routes/notifs.routes');

const db = require('./config/db.config');


//Application express 
const app = express();

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());

app.use(bodyParser.json());

app.use(expressShield({
  errorHandler: (shieldError, req, res, next) => {
    console.error(shieldError);
    res.sendStatus(400);
  },
}));


//Connexion DB
db.sequelize.sync({force: true})
  .then(() => console.log('sync réussie !'))
  .catch(err => console.log('sync échouée: ' + err));

//Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', likeCommentRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', notifsRoutes);

module.exports = app; 