module.exports = function(app) {
    
    var Question      		= require('../models/question');
    
    // =====================================
    // API ==============================
    // =====================================
    
    app.post('/api/question/add', isLoggedIn, function(req, res) {
        console.log('requesting data')
        console.log(req.body.data.question)
        // if there is no user found with that facebook id, create them
                    var newQuestion            = new Question();
        
                    // set all of the facebook information in our user model
                    newQuestion.question    = req.body.data.question // set the users facebook id                   
                    newQuestion.answer = req.body.data.answer // we will save the token that facebook provides to the user                    
                    newQuestion.postedBy = req.user._id
                    // save our user to the database
                    newQuestion.save(function(err) {
                        if (err)
                            throw err;
                        console.log('question added')
                        // if successful, return the new user
                        return  newQuestion;
                    });
        //res.redirect('/');
    });
    
    app.get('/api/question/all', isLoggedIn, function(req, res) {
        Question.find({ 'postedBy': req.user._id }, function (err, question) {
            if (err) return err;
            return question 
        })                   
        //res.redirect('/');
    });

};
    
    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}