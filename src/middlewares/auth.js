
const jwt = require("jsonwebtoken");
const User = require('../models/user');


const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const token = cookies?.token;
        if (!token) {
            throw new Error("Invalid token");
        }
        const decoded = jwt.verify(token, "DEV@Tinder$1234");
        const userId = decoded._id;
        const user = await User.findById({_id : userId});
        if (!user) {
            throw new Error("No user found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).send("ERROR::" + error.message);
    }
}

module.exports = userAuth;