'use strict';

const Favorite = require('../models').Favorite;

module.exports = {
    create: async (req, res, next) => {
        const currentFavorite = {
            userId: req.body.userId,
            postId: req.body.postId,
        };
        try {
            const favorite = await Favorite.findOrCreate({
                where: {
                    UserId: currentFavorite.userId,
                    PostId: currentFavorite.postId,
                },
                defaults: {
                    UserId: currentFavorite.userId,
                    PostId: currentFavorite.postId,
                }
            });
            res.redirect('/posts/');
        } catch (error) {
            console.log(error);
            res.redirect('/posts/');
        }
    },
    delete: async (req, res, next) => {
        const currentFavorite = await Favorite.findOne({ 
            where: {
                UserId: req.body.userId,
                PostId: req.body.postId,
            } 
        });
        try {
            currentFavorite.destroy();
            res.redirect('/posts/');
        } catch (error) {
            console.log(error);
            res.redirect('/posts/');
        }
    }
};