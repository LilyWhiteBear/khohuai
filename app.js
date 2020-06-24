var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var mongo = require("mongodb");
const mongoose = require("mongoose");
var db = mongoose.connect('mongodb+srv://AbsolutelyNotAdmin:SuperSecurityPassword@planb-rgsxo.mongodb.net/PlanB?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require('express-session');
port = process.env.PORT || 3000

var app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get("*", function(req, res, next){
    res.locals.user = req.user || null;
    res.locals.cart = req.cart || null;
    res.locals.admin = req.admin || null;
    next();
});

app.listen(3001, function(req,res){
    console.log('Server is runing');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


module.exports = app;
