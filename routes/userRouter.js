const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");
const ensureAuthenticated = require("../helperFunctions");


// registration 
userRouter.get('/signup', userController.signupRender);
userRouter.post('/signup', userController.signup);

// login Form
userRouter.get('/login', userController.loginRender);
userRouter.post('/login', userController.login);

// profile
userRouter.get('/profile', ensureAuthenticated, userController.profile);

// edit profile
userRouter.get('/edit', ensureAuthenticated, userController.editprofileRender);
userRouter.post('/edit', ensureAuthenticated, userController.editProfile);

// logout
userRouter.get('/logout', ensureAuthenticated, userController.logout);


module.exports = userRouter;