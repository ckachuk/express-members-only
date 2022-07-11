var Post = require("../models/post")
var User = require("../models/user");
var {body, validationResult} = require("express-validator");


exports.post_create_get = function(req, res, next){
    if(req.user){
        res.render("postViews/new_post", {title: "Create a new post", user: req.user})
    }
    else{
        res.redirect('/login');
    }
}


exports.post_create_post = function(req, res, next){
    res.render("postViews/new_post", {title: "Create a new post", user: req.user})
}

exports.post_detail = function(req, res, next){
    res.render("postViews/new_post", {title: "Create a new post", user: req.user})
}


exports.post_delete = function(req, res, next){
    res.render("postViews/new_post", {title: "Create a new post", user: req.user})
}

