'use strict';

const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const favoriteRoutes = require('./favoriteRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;