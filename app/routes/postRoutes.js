'use strict';

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../lib/jwt');

router.get('/', auth.verifyToken, postController.index);

module.exports = router;