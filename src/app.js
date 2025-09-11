const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignupData, validateLoginData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

//signup route to create a new user
app.post('/signup', async (req, res) => {

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
app.post('/login', async (req, res) => {

    try {
        validateLoginData(req);
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {

            //Create a jwt token 
            const token = jwt.sign({ _id: user._id }, "DEV@Tinder$1234", { expiresIn: '7d' });

            //Add token in cookie and send cookie to user
            res.cookie("token", token,{expires: new Date(Date.now() + 7*24*60*60*1000)})
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

//Get Profile route to get user profile

app.get('/profile', userAuth, async (req, res) => {

    try {

        const user = req.user;
        res.send(user);

    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})

connectDB().then(() => {
    console.log("DB connected successfully");
    app.listen("7777", () => {
        console.log("Server is succesfully listening on port 7777")
    });
}).catch((err) => {
    console.error("DB not connected", err);
})