var express = require('express');
var app = express()

/* GET home page. */
app.get('/',function(req,res){
    res.render('index')
})

/* GET Userlist page. */
app.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('docs');
    collection.find({},{},function(e,docs){
        console.log(docs)
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = app;