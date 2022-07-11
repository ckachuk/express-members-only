var User = require("../models/user")
var {body, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")



exports.login_get = function(req, res, next){
    res.render("login", {title: 'Login'})
}


exports.signup_get = function(req, res, next){
    res.render("sign-up", {title: 'Sign-up'})
}


exports.signup_post = [
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
            password: req.body.password
        })
       

        if (!errors.isEmpty()) {
            res.render("login", { title: "login", errors: errors.array() })
        }
        else {
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(user.password, salt)

            user.save(function(err){
                if(err){ return next(err)}

                res.redirect('/')
            });
        }
    }
]