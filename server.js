var path = require('path');
var express = require('express')
var app = express()

// set pug as template engine
app.set('view engine', 'jade')
app.set('views', './views')

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.get('/',function(req,res){
    res.render('index', {date: new Date().toDateString()})
})

app.listen(port, function () {
  console.log('App listening on port '+port)
})

