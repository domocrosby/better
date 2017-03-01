
// set up ======================================================================
// get all the tools we need
var path = require('path');
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var configDB = require('./config/database.js');

var mongoose = require('mongoose');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended:true}) );
    
// set pug as template engine
app.set('view engine', 'jade')
app.set('views', './views')

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
    
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


