const express = require('express');
const { validateSignupData, validateLoginData } = require('../utils/validation');
const User = require('../models/user');
const authRouter = express.Router();
const bcrypt = require("bcrypt");

//signup route to create a new user
authRouter.post('/signup', async (req, res) => {

    try {
        validateSignupData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordHash })
        await user.save();
        res.send("User added successfully");
    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})

//login api
authRouter.post('/login', async (req, res) => {

    try {
        validateLoginData(req);
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validateCorrectPasswordOrnot(password)
        if (isPasswordValid) {
            const token = await user.getJWT();
            //Add token in cookie and send cookie to user
            res.cookie("token", token,{expires: new Date(Date.now() + 8*3600000)})
            res.send("Login Successful")
        }
        else {
            throw new Error("Invalid Credentials");
        }
    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})

module.exports = authRouter;