const express = require('express');
const matchRouter = express.Router();
const matchController = require("../controllers/matchController.js");
const ensureAuthenticated = require("../helperFunctions");

// load root page for match
matchRouter.get('/', ensureAuthenticated, matchController.matchRender);

// load the page for match history, match request and the match finder
matchRouter.get('/history', ensureAuthenticated, matchController.matchHistoryRender);
matchRouter.get('/request', ensureAuthenticated, matchController.matchRequestRender);
matchRouter.get('/find', ensureAuthenticated, matchController.matchFindRender);

// load match result
matchRouter.post('/result', ensureAuthenticated, matchController.findMatch);

// send match request
matchRouter.post('/like', ensureAuthenticated, matchController.matchRequest);
// respond to match request
matchRouter.post('/accept', ensureAuthenticated, matchController.requestAccept);
matchRouter.post('/reject', ensureAuthenticated, matchController.requestReject);

module.exports = matchRouter;   
