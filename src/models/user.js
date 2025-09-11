const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    gender: {
        type: String,
        lowercase: true,
        trim: true,
        validate(value) {
            const allowedGenders = ['male', 'female', 'other'];
            if (!allowedGenders.includes(value)) {
                throw new Error;
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong enough" + " " + value);
            }
        }
    },
    about: {
        type: String,
        default: "This is default about"
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL" + " " + value);
            }
        }
    },
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    })


userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$1234", { expiresIn: '7d' });
    return token;
}

userSchema.methods.validateCorrectPasswordOrnot = async function(passwordEnteredByUser){
    const user = this;
    const passwordHarsh = user.password;
    const isPasswordValid = await bcrypt.compare(passwordEnteredByUser, passwordHarsh);
    return isPasswordValid;
}
const User = mongoose.model("User", userSchema);
module.exports = User;