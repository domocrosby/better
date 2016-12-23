
var express = require('express');
var app = express()

// /* GET Userlist page. */
app.get('/list', function(req, res) {
    var db = req.db;
    console.log(db)
    var collection = db.collection('tasks');
   collection.find().toArray(function(err, docs) {
        res.json(docs)
        console.log(JSON.stringify(docs))
        db.close()
      // send HTML file populated with quotes here
    })
        //{sort: {textScore: {$meta: "textScore"}}},
//     function(e,docs){
// //    collection.find({$text: {$search:"adf" }}, {score: {$meta: "toextScore"}}).sort({score:{$meta:"textScore"}}).toArray(function(e,docs){
//         res.json(docs)
//         console.log(JSON.stringify(docs))
//         db.close()
//     });
});

/*
 * POST to adduser.
 */
app.post('/add', function(req, res) {
    var db = req.db;
    var collection = db.collection('tasks');
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