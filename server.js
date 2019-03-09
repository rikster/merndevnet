const express = require('express'); // Fast, unopinionated, minimalist web api framework for node.
const mongoose = require('mongoose'); // Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

// api files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// db config
const db = require("./config/keys").mongoURI;

// connect to db
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(e => console.log(e));

app.get("/", (req, res) => res.send("Hello Worlds"));

// api routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
