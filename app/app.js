'use strict';

const createError = require('http-errors');
const express = require('express');
const app = express();
const accountControl = require('./lib/passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const layouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use(layouts);
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
// セッション
app.use(
    session({
        secret: 'secret_passcode',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 10 * 1000 },
    })
);
app.use(...accountControl.initialize());
app.use('/', indexRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;