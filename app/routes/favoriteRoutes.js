'use strict';

const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const auth = require('../libs/jwt');

router.post('/create', auth.verifyToken, favoritesController.create);
router.delete('/delete', auth.verifyToken, favoritesController.delete);

module.exports = router;