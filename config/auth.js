module.exports = {

    'facebookAuth' : {
        clientID: process.env.FBID || '711888558936329' ,
        clientSecret: process.env.FBsecret || '0e3a1c34892d3085a7b9de1ac2521c8d',
        callbackURL: process.env.FB ||'https://better-dominisi.c9users.io/auth/facebook/callback'
    }

};