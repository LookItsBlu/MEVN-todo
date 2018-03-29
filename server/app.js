var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// API vv
var api = require('./api/main.js');
app.get('/todolist/get', api.itemsGet);
app.post('/todolist/add', api.itemsAdd);
app.post('/todolist/delete', api.itemsDelete);
app.post('/todolist/update', api.itemsUpdate);
// API ^^

// DB vv
mongoose.connect('mongodb://localhost/todolist');
// DB ^^


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error object
  res.status(err.status || 500);
  res.send({ error : 'Sorry, the request could not be resolved, did you enter the url correctly?' });
});

module.exports = app;
