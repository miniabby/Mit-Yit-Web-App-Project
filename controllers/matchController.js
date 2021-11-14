const mongoose = require("mongoose");
const User = mongoose.model("user");


/*************************** load pages ****************************/

// GET request - load root page
const matchRender = async (req, res) => {
    res.render('match');
}

// GET request - load match history page
const matchHistoryRender = async (req, res) => {
    const history = req.user.history;
    if (history[0]===undefined) {
        res.render('match_history', {
            empty: "you don't have any previous match yet.",
            histories: history
        });
    } else {
        res.render('match_history', {
            histories: history
        });
    }
}

// GET request - load match request page
const matchRequestRender = async (req, res) => {
    const request = req.user.request;
    if (request[0]===undefined) {
        res.render('match_request', {
            empty: "Currently you don't have requests from other users",
            requests: request
        });
    } else {
        res.render('match_request', {
            requests: request
        });
    }
}

// GET request - load match finder page
const matchFindRender = async (req, res) => {
    res.render('match_find');
}


/********************** perform match finding **********************/

// POST request - find matches for a user
const findMatch = async (req, res) => {

    // extract cuisine preference and availabilities
    const {first, second, third} = req.body;
    const {lunch, dinner, coffee} = req.body;

    // make sure cuisine is not null or empty string
    const preference = [];
    [first, second, third].forEach(cuisine=>{
        if(cuisine){
            preference.push(cuisine);
        }
    })

    // find users based on cuisine preference and availability
    const query = {
        $and:[
            {$or:[
                {"dietary.cuisine.first":{$in: preference}},
                {"dietary.cuisine.second":{$in: preference}},
                {"dietary.cuisine.third":{$in: preference}},
            ]},
            {$or:[
                {"availability.lunch": lunch},
                {"availability.dinner": dinner},
                {"availability.coffee": coffee},
            ]},
            {"username": {$ne: req.user.username}}
        ]
    }

    // return users found to the match finder
    try{
        const usersMatched = await User.find(query);
        if (usersMatched.length===0) {
            res.render('match_result', {
                empty: "Sorry, no available users for your query", 
                users: usersMatched
            });
        } else {
            res.render('match_result', {
                users: usersMatched
            });
        }
    } catch(err) {
        console.log(err);
        res.status(400).send("Database query failed.")
    }  
};


/*********************** handle match request **************************/

// POST request - send match request
// when user is at the match result page and wants to send match request
const matchRequest = async (req, res) => {
    try{
        const request = {
            from: req.user.username,
        }
        // send match request
        await User.updateOne(
            {username: req.body.username}, 
            {$push: {request: request}});
    } catch(err) {
        console.log(err);
        res.send("Database query failed.")
    }
};

// POST request - accept match request
// when user is at the match request page and wants to accept request
const requestAccept = async (req, res) => {
    try{
        const request_id = mongoose.Types.ObjectId(req.body.id);
        // remove the match request since it has been responded
        await User.updateOne(
            {username: req.user.username},
            {$pull: {"request": {"_id": request_id}}});
        
        // update match history for both the sender and the receiver
        const history = {
            from: req.body.user,
            to: req.user.username,
            status: "Accepted", 
        }
        await User.updateMany(
            {$or: [
                {username: req.body.user},
                {username: req.user.username}
            ]},
            {$push: {history: history}});

    } catch(err){
        console.log(err);
        res.send("Database query failed.")
    }
}

// POST request - reject match request
// when user is at the match request page and wants to decline request
const requestReject = async (req, res) => {
    try{
        const request_id = mongoose.Types.ObjectId(req.body.id);
        // remove the match request since it has been responded
        await User.updateOne(
            {username: req.user.username},
            {$pull: {request: {_id: request_id}}});

        // update match history for both the sender and the receiver
        const history = {
            from: req.body.user,
            to: req.user.username,
            status: "Declined", 
        }
        await User.updateMany(
            {$or: [
                {username: req.body.user},
                {username: req.user.username}
            ]},
            {$push: {history: history}});

    } catch(err){
        console.log(err);
        res.send("Database query failed.")
    }
}


module.exports = {
    matchRender,
    matchFindRender,
    matchHistoryRender,
    matchRequestRender,
    findMatch,
    matchRequest,
    requestAccept,
    requestReject
};