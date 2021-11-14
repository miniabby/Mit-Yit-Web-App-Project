const mongoose = require("mongoose");
const User = mongoose.model("user");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy(function(username, password, done){
    // Match Username
        let query = {username:username};
        User.findOne(query, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false);
            }else if(password!=user.password){
                return done(null, false);
            }else{
                return done(null, user);
            }
        }) 
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}