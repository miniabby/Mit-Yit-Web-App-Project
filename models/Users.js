const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum:["", "Male", "Female", "Other"]
    },
    dietary: {
        cuisine: {
            first: {
                type: String,
                enum:["", "American", "British", "Japanese", "Chinese", "Korean", "French", "Greek", "Mediterranean", "Indian", "Italian", "Mexican", "Thai", "Spanish"],
                default: ""
            },
            second: {
                type: String,
                enum:["", "American", "British", "Japanese", "Chinese", "Korean", "French", "Greek", "Mediterranean", "Indian", "Italian", "Mexican", "Thai", "Spanish"],
                default: ""
            },
            third: {
                type: String,
                enum:["", "American", "British", "Japanese", "Chinese", "Korean", "French", "Greek", "Mediterranean", "Indian", "Italian", "Mexican", "Thai", "Spanish"],
                default: ""
            }
        },
        allergy: {
            type: String,
            max: 30
            
        },
        religion: {
            type: String,
            max: 30
        }
    },
    availability: {
        lunch: {
            type: String,
            enum:["", "Yes", "No"],
        },
        dinner: {
            type: String,
            enum:["", "Yes", "No"],
        },
        coffee: {
            type: String,
            enum:["", "Yes", "No"],
        }
    },
    additional: {
        academic: {
            major: String,
            level: Number,
        },
        hobbies: String,
        career: String,
    },
    review: [{
        from: String,
        rating: Number,
        tag: [String],
        comment:{
            type: String,
            max: 50
        }
    }],
    request: [{
        from:  String,
    }],
    history: [{
        from:  String,
        to:  String,
        status: {
            type: String,
            enum:["Pending", "Accepted", "Declined"]
        }
    }]
})

const User = mongoose.model("user", userSchema, "user");
module.exports = User; 
