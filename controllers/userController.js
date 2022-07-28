var User = require("../models/user")
var {body, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
require('dotenv').config();



exports.getSignup = function(req, res, next){
    res.render("sign-up", {title: 'Sign-up'})
}

exports.postSignup = [
    body("firstname", "First name must not be less than 3 characters.").trim().isLength({min:3}).escape(),
    body("firstname", "First name must not be more than 50 characters.").trim().isLength({max:50}).escape(),
    body("lastname", "Last name must not be less than 3 characters.").trim().isLength({min:3}).escape(),
    body("lastname", "Last name must not be more than 50 characters.").trim().isLength({max:50}).escape(),
    body("username", "Username must not be less than 3 characters.").trim().isLength({min:3}).escape(),
    body("username", "Username must not be more than 50 characters.").trim().isLength({max:50}).escape(),
    body("password", "Password must not be less than 8 characters.").trim().isLength({min:8}).escape(),
    body("password", "Password must not be more than 50 characters.").trim().isLength({max:50}).escape(),
    async function (req, res, next) {
        var errors = validationResult(req.body)

        var user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            membership_status: false,
            admin_status: false,
        })
       

        if (!errors.isEmpty()) {
            res.json({ status: "FAILED", message: errors.array() })
        }
        else {
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(user.password, salt)

            user.save(function(err){
                if(err){ return next(err)}

                res.json({status:'OK', message: "The user has been created"})
            });
        }
    }
]

exports.getPrivileges = (req, res, next)=>{
    res.json({message: "Get your privileges"});
  }

exports.postMembershipStatus = function (req, res, next){
    
    User.findById(req.body.userid, function(err, user){
        if(err){return next(err)}

        if(user.membership_status === true){
            res.json({ status: "FAILED MEMBERSHIP TRUE",  message: "You already have the status of member"});
        }  
        else if(req.body.membershipKey === process.env.MEMBERSHIP_KEY){
            User.findByIdAndUpdate(user.id, {membership_status: true}, function(err){
                if(err){return next(err)}
                res.json({ status: "OK",  message: "You became a member"});
            })
        }
        else{
            res.json({ status: "FAILED", message: "Incorrect key for membership status"});
        }
    })
    

}


exports.postAdminStatus = function (req, res, next){ 
    User.findById(req.body.userid, function(err, user){
        if(err){return next(err)}

        if(user.admin_status === true){
            res.json({ status: "FAILED ADMIN TRUE",  message: "You already have the status of admin"});
        }
        else if(req.body.adminKey === process.env.ADMIN_KEY){
            User.findByIdAndUpdate(user.id, {admin_status: true, membership_status:true}, function(err){
                if(err){return next(err)}
                res.json({ status: "OK",  message: "You became an admin member"});
            })
        }
        else{
            res.json({ status: "FAILED", message: "Incorrect key for admin status"});
        }
    })

}