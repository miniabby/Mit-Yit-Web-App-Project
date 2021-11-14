// access control - unauthenticated users are prompted to log in
function ensureAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.render('index', {
            msg: "Please register or login"
        })
    }
};

module.exports = ensureAuthenticated;