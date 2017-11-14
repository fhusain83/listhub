var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var index = require('./routes/index');
//var port     = process.env.PORT || 8080;
var env = require('dotenv').load();




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(expressSession({secret: 'mySecretKey'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

var flash = require('connect-flash');
app.use(flash());


app.use(index);

var models=require("./models");
models.sequelize.sync().then(function(){
  console.log("ok");  
}).catch(function(err){
  console.log(err,"There was an error");
});

// var authRoute = require('./routes/index.js')(app,passport);
require('./config/passport/passport.js')(passport, models.User);
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


app.listen(8080, function(err) {
 
    if (!err)
        console.log("Site is live");
    else
     console.log(err)
 
});


module.exports = app;