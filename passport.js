const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require("./models/user");
require('dotenv').config();

passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username: username}, function(err, user){
      if(err){ return done(err)}
      if(!user) {return done(err, false, {message: "Incorrect username"})}
  
      bcrypt.compare(password, user.password, (err, res)=>{
        if(res){
          return done(false, user)
        }
        else{
          return done(err, false, {message: "Incorrect password"} )
        }
      })
    })
  }))
  
  
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}, function(jwtPayload, cb){
  cb(null, jwtPayload)
  
}))