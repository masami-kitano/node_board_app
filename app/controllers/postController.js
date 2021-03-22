'use strict';

module.exports = {
    index: (req, res) => {
        res.render('post/index', {
            title: '投稿一覧',
        });
    },
};