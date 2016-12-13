var url = process.env.MONGODB_URI;
var mongo = require('mongodb').MongoClient

var obj = {
  firstName : 'dom',
  lastName : 'crosby'
}

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var collection = db.collection('docs');
//   collection.insert(obj,function(err, documents) {
//       if (err) throw err
//       console.log(JSON.stringify(obj))
//       db.close()
//     })
// })

// mongo.connect(url, function(err, db) {
//   if (err) throw err
//   var collection = db.collection('docs');
//   collection.find({
//       firstName: 'dom'
//     }).toArray(function(err, documents) {
//       if (err) throw err
//       console.log(documents)
//       db.close()
//     })
// })