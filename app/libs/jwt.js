'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (req, res, next) => {
    const user = { name: req.session.username };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    req.session.accessToken = token;
    next();
  },
  verifyToken: (req, res, next) => {
    const accessToken = req.session.accessToken;
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/users/login');
      } else {
        req.user = user;
        next();
      }
    });
  },
};