const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');

const app = express();


/************************* middlewares *************************/

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./models');

// load view engine
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname,"public")));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))
  
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


/*************************** routing ***************************/

// homepage (before login)
app.get("/", (req, res) => {
    res.render('index');
});

// homepage (after login)
app.get("/home", ensureAuthenticated, (req, res) => {
    res.render('home');
});


// three paths: user, matching system and review system
// for deliverable 3, the user route is implemented
const userRouter = require('./routes/userRouter.js');
const matchRouter = require('./routes/matchRouter.js');
const reviewRouter = require('./routes/reviewRouter.js');

app.use('/user', userRouter);
app.use('/match', matchRouter);
app.use('/review', reviewRouter);

// if the user entered an unspecified path
app.use((req, res) => {
    res.status(404).send("Not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Mit & Yit is listening on port ${PORT}!`);
});

module.exports = app;

// access control - unauthenticated users are prompted to log in
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.render('index', {
            msg: "Please register or login"
        })
    }
}