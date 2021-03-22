'use strict';

const connection = require('../config/mysql.config');
const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
        res.render('users/login', {
            title: 'ログイン',
            message: req.flash('message'),
        });
    },
    register: (req, res) => {
        res.render('users/register', { title: '新規会員登録' });
    },
    check: (req, res, next) => {
        const currentUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        const errorMsg = [];
        connection.query(
            'SELECT * FROM users WHERE email=?',
            [currentUser.email],
            (error, results) => {
                if (results.length > 0) {
                    errorMsg.push('既に登録されたメールアドレスです。');
                    res.render('user/register', {
                        title: '新規会員登録',
                        currentUser,
                        errorMsg,
                    });
                    return;
                } else {
                    next();
                }
            }
        );
    },
    create: async (req, res, next) => {
        const currentUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        try {
            const hashPass = await bcrypt.hash(currentUser.password, 10);
            connection.query(
                'INSERT INTO users (username, email, password) VALUES(?, ?, ?)', [currentUser.username, currentUser.email, hashPass],
                (error, results) => {
                    next();
                }
            );
        } catch (error) {
            console.log(error);
            res.redirect('/users/register');
        }
    },
    logout: (req, res, next) => {
        req.session.destroy((error) => {
            res.redirect('/users/login');
        });
    },
};