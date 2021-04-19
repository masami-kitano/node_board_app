'use strict';

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const postValidator = require('../libs/postValidator');
const auth = require('../libs/jwt');

router.get('/', auth.verifyToken, postsController.index, postsController.indexView);
router.get('/new', auth.verifyToken, postsController.new);
router.post('/create', auth.verifyToken, postValidator.validations, postValidator.validationError, postsController.create);
router.get('/:id/edit', auth.verifyToken, postsController.edit);
router.put('/:id/update', auth.verifyToken, postValidator.validations, postValidator.validationError, postsController.update);
router.delete('/:id/delete', auth.verifyToken, postsController.delete);

module.exports = router;