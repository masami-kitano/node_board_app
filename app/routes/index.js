'use strict';

const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;