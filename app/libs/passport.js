'use strict';

const User = require('../models').User;
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStratgy = require('passport-local').Strategy;

passport.serializeUser((email, done) => {
    done(null, email);
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({
            where: { email }
        });
        done(null, user);
    } catch (error) {
        done(null, error);
    }
});

passport.use(
    'local-Strategy',
    new LocalStratgy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const user = await User.findOne( { where: { email: email } })

                if (await bcrypt.compare(password, user.password)) {
                    req.session.username = user.username;
                    req.session.userId = user.id;
                    return done(null, user.email);
                } else {
                    return done(
                        null,
                        false,
                        req.flash('error', 'ユーザー名またはパスワードが違います。')
                    );
                }
            } catch (error) {
                console.log(error);
                return done(
                    null,
                    false,
                    req.flash('error', 'ユーザー名またはパスワードが違います。')
                );
            }
        }
    )
);

const initialize = () => {
    return [
        passport.initialize(),
        passport.session(),
        function(req, res, next) {
            if (req.user) {
                res.locals.user = req.user.username;
                res.locals.userId = req.user.id;
                res.locals.isLoggedIn = true;
            } else {
                res.locals.user = 'ゲストユーザー';
                res.locals.isLoggedIn = false;
            }
            next();
        },
    ];
};
const authenticate = () => {
    return passport.authenticate('local-Strategy', {
        successRedirect: '/posts/',
        failureRedirect: '/users/login',
    });
};

module.exports = {
    initialize,
    authenticate,
};