var path = require('path');
var express = require('express')
var app = express()
var routes = require('./routes/index');
var tasks = require('./routes/tasks');
var MongoClient = require('mongodb').MongoClient
var db;
var bodyParser = require('body-parser')

app.use(bodyParser.json());
    
// set pug as template engine
app.set('view engine', 'jade')
app.set('views', './views')

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
    
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
    
MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
    if (err) return console.log(err)
    db = database
    console.log("Database connection ready");
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    
    //db.collection('tasks').ensureIndex({ question: "text" });
   
    app.listen(port, function () {
      console.log('App listening on port '+port)
    })
})

app.use(function(req,res,next){
    req.db = db;
    console.log('routing')
    next();
});
    
//route definitions
app.use('/', routes);
app.use('/tasks', tasks);