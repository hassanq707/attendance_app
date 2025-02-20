const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    attendance: [{
        date: {
            type: Date,   
            required: true
        },
        status: {
            type: String,
            enum: ["accepted", "rejected", "pending"],  
            default: "pending"
        },
        approved: {
            type: Boolean, 
            default: false
        }
    }],
    leaves: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["accepted", "rejected", "pending"],
            default: "pending"
        },
        reason: String 
    }]
});

const USER_DATA = mongoose.model("UserData", userDataSchema);

module.exports = USER_DATA;
