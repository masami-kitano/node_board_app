'use strict';

const connection = require('../config/mysql.config');
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStratgy = require('passport-local').Strategy;

passport.serializeUser((email, done) => {
    done(null, email);
});

passport.deserializeUser((email, done) => {
    connection.query(
        'SELECT * FROM users WHERE email=?', [email],
        (error, results) => {
            if (results.length > 0) {
                done(null, results[0]);
            } else {
                done(null, error);
            }
        }
    );
});

passport.use(
    'local-Strategy',
    new LocalStratgy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req, email, password, done) => {
            connection.query(
                'SELECT * FROM users WHERE email=?',
                [email],
                async (error, results) => {
                    if (results.length > 0) {
                        const user = results[0];
                        if (await bcrypt.compare(password, user.password)) {
                            req.session.username = user.name;
                            return done(null, user.email);
                        } else {
                            return done(
                                null,
                                false,
                                req.flash('message', 'ユーザー名またはパスワードが違います')
                            );
                        }
                    } else {
                        return done(
                            null,
                            false,
                            req.flash('message', 'ユーザー名またはパスワードが違います')
                        );
                    }
                }
            );
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
        successRedirect: '/post/',
        failureRedirect: '/users/login',
    });
};

module.exports = {
    initialize,
    authenticate,
};