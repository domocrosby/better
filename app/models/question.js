// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var questionSchema = mongoose.Schema({

        question        : String,
        answer          : String,
        postedBy        : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

// create the model for users and expose it to our app
module.exports = mongoose.model('Question', questionSchema);