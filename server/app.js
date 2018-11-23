var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/IndexRouter.js');
var authRouter = require('./routes/AuthRouter.js');
var choresRouter = require('./routes/ChoresRouter.js');
var housesRouter = require('./routes/HousesRouter.js');
var usersRouter = require('./routes/UsersRouter.js');

var app = express();

//var db = require('./db/db.js');
var dbSchema = require('./db/schema.js');
dbSchema.updateSchema();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/chores', choresRouter);
app.use('/houses', housesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error status
  res.sendStatus(err.status || 500);
});

module.exports = app;
