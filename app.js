var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
var LocalStrategy = require("passport-local")
var User = require("./models/user")
var indexRouter = require('./routes/index');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.DB_PATH, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

//passport implementation
passport.use(new LocalStrategy((username, password, done)=>{
  User.findOne({username: username}, function(err, user){
    if(err){ return done(err)}
    if(!user) {return done(err, false, {message: "Incorrect username"})}

    bcrypt.compare(password, user.password, (err, res)=>{
      if(res){
        return done(false, user)
      }
      else{
        return done(err, false, {message: "Incorrect password"} )
      }
    })
  })
}))


passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
      if (err) { return cb(err); }
      done(null, user);
  });
});


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl:process.env.DB_PATH,
    useUnifiedTopology: true, 
    useNewUrlParser: true}),
  cookie: {
      maxAge: 1000 * 30
  }
}));





app.use(passport.initialize());
app.use(passport.session());





app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
