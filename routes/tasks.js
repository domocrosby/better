var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express()

// /* GET Userlist page. */
app.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.collection('tasks');
    console.log(req.query.term);
   collection.find({$text: {$search:req.query.term }}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function(err, docs) {
        res.json(docs)
        console.log(JSON.stringify(docs))
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
    console.log('adding data')
    console.log(req.body)
    var db = req.db;
    var collection = db.collection('tasks');
    collection.insert(req.body, function(err, result){
        //console.log(req);
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

app.delete('/delete/:id', function(req, res) {
   //toDO create Delete stuff
    var db = req.db;
    var collection = db.collection('tasks');
    console.log(req.params.id)
    collection.deleteOne({ _id : ObjectId(req.params.id)} , function(err, result){
        console.log(err);
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = app;