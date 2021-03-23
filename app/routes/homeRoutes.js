'use strict';

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const auth = require('../libs/jwt');

router.get('/', auth.verifyToken, homeController.index);

module.exports = router;