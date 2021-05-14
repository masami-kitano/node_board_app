'use strict';

const { check, validationResult } = require('express-validator');

module.exports = {
  validations: [
    check('title')
      .not()
      .isEmpty()
      .withMessage('タイトルは必須です。'),
    check('content')
      .not()
      .isEmpty()
      .withMessage('コンテンツは必須項目です。')
      .isLength({ min: 0, max: 140 })
      .withMessage('コンテンツは140字以内にしてください。')
  ],
  validationError: (req, res, next) => {
    const errors = validationResult(req);
    const currentPost = {
      title: req.body.title,
      content: req.body.content,
    };
    if (!errors.isEmpty()) {
      const errorMsg = errors.array().map((obj) => obj.msg);
      res.render('posts/new', {
        title: 'new',
        currentPost,
        errorMsg,
      });
      return;
    } else {
      next();
    }
  },
};