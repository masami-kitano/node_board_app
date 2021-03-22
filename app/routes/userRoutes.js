'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const userValidator = require('../lib/userValidator');
const auth = require('../lib/jwt');
const { authenticate } = require('../lib/passport');

// 新規会員登録画面の表示
router.get('/register', usersController.register);
// 新規会員登録の処理
router.post('/create', userValidator.validations, userValidator.validationError, auth.createToken, usersController.check, usersController.create, authenticate());

// ログイン画面表示
router.get('/login', usersController.login);
// ログイン処理
router.post('/login', auth.createToken, authenticate());

// ログアウト処理
router.post('/logout', usersController.logout);

module.exports = router;