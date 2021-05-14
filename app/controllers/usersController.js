'use strict';

const User = require('../models').User;
const bcrypt = require('bcryptjs');

module.exports = {
  login: (req, res) => {
    res.render('users/login', {
      title: 'ログイン',
      message: req.flash('message'),
    });
  },
  register: (req, res) => {
    res.render('users/register', { title: '新規会員登録' });
  },
  check: async (req, res, next) => {
    const currentUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const user = await User.findOne({
        where: { email: currentUser.email },
      }); 
      if(user) {
        req.flash('error', '既に登録されているメールアドレスです。');
        res.render('users/register', {
           title: '新規会員登録',
           currentUser, 
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res, next) => {
    const currentUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const hashPass = await bcrypt.hash(currentUser.password, 10);
      const user = await User.create({
        username: currentUser.username,
        email: currentUser.email,
        password: hashPass,
      });
      next();
    } catch (error) {
      console.log(error);
      res.redirect('/users/register');
    }
  },
  logout: (req, res, next) => {
    req.session.destroy((error) => {
      res.redirect('/users/login');
    });
  },
};