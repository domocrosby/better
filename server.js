var path = require('path');
var express = require('express')
var app = express()

// set pug as template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/home',function(req,res){
    res.render('index', {date: new Date().toDateString()})
})

app.listen(port, function () {
  console.log('Example app listening on port '+port)
})

