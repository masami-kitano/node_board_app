'use strict';

const { check, validationResult } = require('express-validator');

module.exports = {
  validations: [
    check('username')
      .not()
      .isEmpty()
      .withMessage('お名前は必須項目です。'),
    check('email')
      .not()
      .isEmpty()
      .withMessage('メールアドレスは必須項目です。')
      .isEmail()
      .normalizeEmail()
      .withMessage('有効なメールアドレス形式で指定してください。'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('パスワードは必須項目です。')
      .isLength({ min: 8, max: 25 })
      .withMessage('パスワードは8文字から25文字にしてください。'),
    check('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('パスワードが一致しません。');
      }
      return true;
    }),
  ],
  validationError: (req, res, next) => {
    const errors = validationResult(req);
    const currentUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    if (!errors.isEmpty()) {
      const errorMsg = errors.array().map((obj) => obj.msg);
      res.render('users/register', {
        title: 'register',
        currentUser,
        errorMsg,
      });
      return;
    } else {
      next();
    }
  },
};