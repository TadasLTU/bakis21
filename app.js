/*** moduliu pareikalavimai ***/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()



var routes = require('./routes/index');
var note = require('./routes/note');
var cats = require('./routes/cats');
var login = require('./routes/login');
var user = require('./routes/user');
var roomData = require('./routes/roomData');
var api = require('./routes/api');
var calendar = require('./routes/calendar');
var controlerData = require('./routes/controlerData');


var passport = require('passport');


var app = express();

//Passport config
require('./config/passport')(passport);


// Development
mongoose.connect('mongodb://root:example@127.0.0.1:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('Connected to MongoDB'))
.catch((err)=> console.log(err));

// Prod
// mongoose.connect('mongodb+srv://test:test@cluster0.gckbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
// .then(() => console.log('Connected to MongoDB'))
// .catch((err)=> console.log(err));

//express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie:{_expires : 180000}
  })
);

//Passport midleware

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Flash midleware
app.use(require('flash')());
app.use((req, res, next) => {
  res.locals.success_msg_login = req.flash('success_msg_login');
  res.locals.error_msg_login = req.flash('error_msg_login');
  next();
})


// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
// app.use(morgan('combined'));


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*** route aprasymas ***/
app.use('/', routes);
app.use('/note', note);
app.use('/cat', cats);
app.use('/login', login);
app.use('/user', user);
app.use('/roomData', roomData);
app.use('/api', api);
app.use('/calendar', calendar);
app.use('/controlerData', controlerData);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;