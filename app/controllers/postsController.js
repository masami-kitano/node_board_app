'use strict';

const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
    index: async (req, res, next) => {
        const allPosts = await Post.findAll({ include: User });
        res.locals.posts = allPosts;
        next();
    },
    indexView: (req, res) => {
        res.render('posts/index', { title: '投稿一覧' });
    },
    new: (req, res) => {
        res.render('posts/new', { title: '新規投稿' });
    },
    create: async (req, res, next) => {
        const currentPost = {
            title: req.body.title,
            content: req.body.content,
        };
        try {
            console.log(req.session);
            const post = await Post.create({
                title: currentPost.title,
                content: currentPost.content,
                UserId: req.session.userId,
            });
            res.redirect('/posts/');
        } catch (error) {
            console.log(error);
            res.redirect('/posts/new');
        }
    },
    edit: async (req, res) => {
        const postId = req.params.id;
        const currentPost = await Post.findOne({ where: { id: postId } });
        if ( currentPost.UserId === req.session.userId) {
            res.render('posts/edit', { title: '投稿編集', currentPost: currentPost } );
        } else {
            res.redirect('/posts/');
        }
    },
    update: async (req, res, next) => {
        const postId = req.params.id;
        const updatePost = {
            title: req.body.title,
            content: req.body.content,
        };
        try {
            const post = await Post.update(
                { title: updatePost.title, content: updatePost.content },
                { where: { id: postId } }
            );
            res.redirect('/posts/');
        } catch (error) {
            console.log(error);
            res.redirect(`/posts/${postId}/edit`);
        }
    },
    delete: async (req, res, next) => {
        const postId = req.params.id;
        const currentPost = await Post.findOne({ where: { id: postId } });
        if ( currentPost.UserId === req.session.userId ) {
            currentPost.destroy();
            res.redirect('/posts/');
        } else {
            res.redirect('/posts/');
        }
    },
};