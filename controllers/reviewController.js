const mongoose = require("mongoose");
const User = mongoose.model("user");

/*************************** load pages ****************************/

// GET request - load root page
const reviewRender = async (req, res) => {
    res.render('review');
};

// GET request - load write review page
const writeRender = async (req, res) => {
    res.render('write_review');
};

/*************************** write review ***************************/
const writeReview = async (req, res) => {

    try{
        const errors = [];
        if (!req.body.username) {
            errors.push({param: 'username', msg: 'Username is required', value: ''});
        }
        if (!req.body.rating) {
            errors.push({param: 'rating', msg: 'Rating is required', value: ''});
        }
        if (!req.body.tag) {
            errors.push({param: 'tag', msg: 'Tag is required', value: ''});
        }

        if (errors.length != 0){
            res.render('write_review', { errors: errors});
            return;
        }

        const check = {
            $and: [
                {"username": req.user.username},
                {$or:[
                    {$and:[
                        {"history.from": req.user.username},
                        {"history.to": req.body.username},
                    ]},
                    {$and:[
                        {"history.to": req.user.username},
                        {"history.from": req.body.username},
                    ]},
                ]}
            ]
        }    
        
        const history = await User.findOne(check);
        if (!history) {
            res.render('write_review', 
            {msg: "Sorry you are not eligible to write reviews for this user"})
            return
        } else {
            const review = {
                from: req.user.username,
                rating: req.body.rating,
                tag: req.body.tag,
                comment: req.body.comment,
            }
            await User.updateOne({"username": req.body.username}, {$push: {"review": review}});
            res.render('write_review', {msg: "You have successfully written a review."})
            return
        } 
    } catch(err) {
        console.log(err);
        res.send("Database query failed");
    }

}

// GET request - view reviews written by other users
const viewRender = async (req, res) => {
    const review = req.user.review;
    if (review[0]===undefined) {
        res.render('view_review', 
        {empty: "Currently you don't have reviews from other users", reviews: review});
    } else {
        res.render('view_review', {reviews: review});
    }
};


module.exports = {
    reviewRender,
    writeRender,
    viewRender,
    writeReview,
};