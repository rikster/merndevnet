const express = require('express'); // Fast, unopinionated, minimalist web api framework for node.
const mongoose = require('mongoose'); // Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const bodyParser = require('body-parser'); // parsing json body
const passport = require('passport'); // Passport is expressjs compatible authentication middleware for Node.js. Passport's sole purpose is to authenticate requests (JWT, oAuth, OpenID, etc)

// api files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// api body parser middleware - parsing json payloads
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connect to db
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(e => console.log(e));

// Passport middleware
app.use(passport.initialize());

// Passport config (use JWT "strategy")
require('./config/passport')(passport);

// api routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
