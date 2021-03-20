'use strict';

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../lib/jwt');

router.get('/index', auth.verifyToken, postController.index);

module.exports = router;