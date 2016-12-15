var express = require('express');
var app = express()

// /* GET Userlist page. */
app.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('docs');
    collection.find({},{},function(e,docs){
        res.json(docs)
    });
});

/*
 * POST to adduser.
 */
// router.post('/adduser', function(req, res) {
//     var db = req.db;
//     var collection = db.get('userlist');
//     collection.insert(req.body, function(err, result){
//         res.send(
//             (err === null) ? { msg: '' } : { msg: err }
//         );
//     });
// });


module.exports = app;