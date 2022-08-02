var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongoose = require("mongoose");
require('dotenv').config();
var indexRouter = require('./routes/index');
require('./passport')
var helmet = require('helmet');
var compression = require('compression');


var app = express();



mongoose.connect(process.env.DB_PATH, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));



app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));




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

});




app.listen(5000 , function () {
  console.log(' app listening on port 5000 !');
});


module.exports = app;
