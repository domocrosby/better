var express = require('express');
var app = express()

// /* GET Userlist page. */
app.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    collection.find({},{},function(e,docs){
        res.json(docs)
        console.log(JSON.stringify(docs))
        db.close()
    });
});

/*
 * POST to adduser.
 */
app.post('/add', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    console.log('body' + req.body);
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
        console.log(JSON.stringify(result))
        db.close()
    });
});


module.exports = app;