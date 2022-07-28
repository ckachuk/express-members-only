const passport = require("passport");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getLogin = function(req, res, next){
    res.json({status: 'OK', message: "Enter username and password to login"})
}

exports.postLogin = function (req, res) {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          status: "FAILED",
          message: "Incorrect Username or Password",
          user,
        });
      }
  
      jwt.sign(
        { _id: user._id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "20m" },
        (err, token) => {
          if (err) return res.status(400).json(err);
          res.json({
            token: token,
            user: { _id: user._id, username: user.username },
          });
        }
      );
    })(req, res);
  };

exports.getLogout = function(req, res, next){
    req.logout(function(err){
      if(err){return next(err)}
      return res.json({status:"OK", message:"the user has been logout"})
    })
  
}


