'use strict';

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const auth = require('../lib/jwt');

router.get('/', auth.verifyToken, homeController.index);

module.exports = router;