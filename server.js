var path = require('path');
var express = require('express')
var app = express()
var routes = require('./routes/index');
var tasks = require('./routes/tasks');
var mongo = require('mongodb')
var monk = require('monk');
var db = monk(process.env.MONGODB_URI);
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// set pug as template engine
app.set('view engine', 'jade')
app.set('views', './views')

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.use(function(req,res,next){
    req.db = db;
    next();
});

//route definitions
app.use('/', routes);
app.use('/tasks', tasks);

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('App listening on port '+port)
})
