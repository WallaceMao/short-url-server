var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var index = require('./routes/index');
var rsqApi = require('./routes/rsqApi');

// IP过滤
var ipfilter = require('express-ipfilter').IpFilter;


// token权限
var passport = require('passport');
var dao = require('./db/dao');
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;

passport.use(new LocalAPIKeyStrategy({
      apiKeyField: 'token'
    },
    function(apikey, done) {
      dao.checkAuth(apikey)
          .then(function(client){
            return done(null, client);
          });
    }
));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ip过滤
// app.use();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//  rsq api，需要做token+ip的权限认证
app.use('/rsq',
    ipfilter(config.security.whiteList, {mode: 'allow'}),
    passport.authenticate('localapikey', { session: false,failureRedirect: '/unauthorized' }),
    rsqApi);

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
