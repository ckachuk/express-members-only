var Post = require("../models/post");
var User = require("../models/user");
var {body, validationResult} = require("express-validator");



exports.getAllPost = function(req, res, next) {
    console.log(req.token)
    Post.find({})
    .populate('user')
    .exec(function(err, posts){
        if(err){ return next(err)}
        res.json({status:"OK", posts: posts});
    })    
}

exports.getCreatePost = function(req, res, next){
    if(req.user){
        res.json({status: "OK", message: "Create a new post", user: res.locals.currentUser})
    }
    else{
        res.json({status: "FAILED", message: "Log in first"})
    }
}


exports.postCreatePost = [
    body("title", "Title must not be empty").trim().isLength({min: 1}).escape(),
    body("title", "Title must not be more than 100 characters").trim().isLength({max: 100}).escape(),
    body("text", "Text must not be empty").trim().isLength({min: 1}).escape(),
    body("text", "Text must not be more than 144 characters").trim().isLength({max: 144}).escape(),
    (req, res, next)=>{
       var errors = validationResult(req.body)
      
       var post = new Post({
           title: req.body.title,
           text: req.body.text,
           timestamp: new Date(),
           user: req.user._id
       })

       if(!errors.isEmpty()){
         res.json({status: "FAILED", message: "Create a new post", user: req.user, errors: errors.array()});
       }
       else{
           post.save(function(err){
               if(err){ return next(err)}
               res.json({status: "OK", message: "Post has been created", post: post})
           })
       }
    }
]



exports.deletePost = function(req, res, next){
    User.findById(req.body.userid , (err, user)=>{
        if(err){return next(err)}
        if(user.admin_status === true){  
            Post.findByIdAndDelete(req.params['id'], function(err,post ){
                
                if(err){
                    res.json({status: "FAILED", message: "an error has occurred"});
                }
                res.json({status: 'OK', message: "Post has been deleted"})
            })
        }
        else{
            res.json({status: "FAILED CREDENTIALS", message: "You dont have the credentials to delete"});
        }
    })
    
}

