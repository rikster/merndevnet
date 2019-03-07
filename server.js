const express = require('express');
const mongoose = require('mongoose');

const app = express();

// db config
const db = require("./config/keys").mongoURI;

// connect to db
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(e => console.log(e));

app.get("/", (req, res) => res.send("Hello Worlds"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
