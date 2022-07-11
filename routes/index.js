var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController")
var postController = require("../controllers/postController")
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/login', userController.login_get)

router.post('/login',passport.authenticate('local',{
  successRedirect: "/",
  failureRedirect: "/login"
}))

router.get("/log-out", (req, res, next)=>{
  req.logout(function(err){
    if(err){return next(err)}
  })

  res.redirect("/")
})

router.get('/sign-up', userController.signup_get)


router.post('/sign-up', userController.signup_post)



//posts routes

router.get('/post/create', postController.post_create_get)

router.get('/post/create', postController.post_create_post)


router.get('/post/:id', postController.post_detail)

router.post('/post/:id/delete', postController.post_delete)

module.exports = router;
