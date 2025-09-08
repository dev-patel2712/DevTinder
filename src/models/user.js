const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type:String,
    },
    gender:{
        type:String,
    },
    emailId:{
        type:String,
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;