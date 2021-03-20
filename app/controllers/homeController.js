'use strict';

module.exports = {
    index: (req, res, next) => {
        res.render('index', { title: 'Node Board App', name: res.locals.user });
    },
};
