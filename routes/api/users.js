const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load Input validation
const validationRegistrationInput = require('../../validation/register');

// Load user model
const User = require('../../models/user');

// api/users/test
router.get('/test', (req, res) => res.json({ msg: 'users Works' }));

// api/users/register
router.post('/register', (req, res) => {
  const { errors, isValid } = validationRegistrationInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // to request body you need the BodyParser npm package middleware (server.js)
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

    // create a new user via the mongoose model
    else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // generate a salt and hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Post user login
// @access Public

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    // check password (user.password is the encrypted one in mongo)
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        // create jwt payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        // sign and return token
        jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }); // 3600secs = 1hr
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
