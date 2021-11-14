const express = require("express");
const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController.js");
const ensureAuthenticated = require("../helperFunctions");

// load root page for review
reviewRouter.get('/', ensureAuthenticated, reviewController.reviewRender);

// view reviews written by other users
reviewRouter.get('/view', ensureAuthenticated, reviewController.viewRender);

// load the page for writing reviews
reviewRouter.get('/write', ensureAuthenticated, reviewController.writeRender);

// allow the user to write a review
reviewRouter.post('/write', ensureAuthenticated, reviewController.writeReview);


module.exports = reviewRouter;