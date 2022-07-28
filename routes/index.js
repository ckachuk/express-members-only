var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController")
var postController = require("../controllers/postController")
var authController = require("../controllers/authController")
var passport = require("passport")

/* GET home page. */
router.get('/posts', postController.getAllPost);

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.post("/log-out", authController.getLogout)

router.get('/signup', userController.getSignup)


router.post('/signup', userController.postSignup)

//get priviliges

router.get("/privileges",passport.authenticate('jwt', {session: false}) , userController.getPrivileges)

router.post("/privileges/membership",passport.authenticate('jwt', {session: false}), userController.postMembershipStatus);

router.post('/privileges/admin', userController.postAdminStatus);

//posts routes

router.get('/post', postController.getCreatePost)

router.post('/post', passport.authenticate('jwt', {session: false}), postController.postCreatePost)


router.post('/post/:id/delete', passport.authenticate('jwt', {session: false}), postController.deletePost)

module.exports = router;
