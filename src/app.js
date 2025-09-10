const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignupData, validateLoginData } = require("./utils/validation")
const bcrypt = require("bcrypt");

app.use(express.json());

//signup route to create a new user
app.post('/signup', async (req, res) => {

    try {
        validateSignupData(req);
        const {firstName, lastName, emailId, password} = req.body;
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
        const {emailId, password} = req.body;
        
        const user = await User.findOne({emailId:emailId})
        if(!user){
            throw new Error ("Invalid Credentials");
        }
        const isPasswordValid = bcrypt.compare(password,user.password)
        if(isPasswordValid)
        {
            res.send("Login Successful")
        }
        else{
            throw new Error ("Invalid Credentials");
        }
    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})

//get all users by emailId 

app.get('/users', async (req, res) => {

    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        if (users.length === 0) {
            return res.status(404).send("No user found with this emailId");
        }
        else {
            res.send(users);
        }
    }
    catch (error) {
        res.status(400).send("Something went wrong !");
    }

})

//Feed route to get all users

app.get('/feed', async (req, res) => {

    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(404).send("No user found");
        }
        else {
            res.send(users);
        }
    }
    catch (error) {
        res.status(400).send("Something went wrong !");
    }

})


//get only one user by emailId with findOne method (even if two users have same emailId it will return only one user)

// app.get('/user', async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//         const user = await User.findOne({ emailId: userEmail });
//         if (!user) {
//             return res.status(404).send("No user found with this emailId");
//         }
//         else {
//             res.send(user);
//         }
//     }
//     catch (error) {
//         res.status(400).send("Something went wrong !");
//     }
// })


//findbyId method to get user by _id

app.get('/userById', async (req, res) => {
    const id = req.body.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("No user found with this Id");
        }
        else {
            res.send(user);
        }
    }
    catch (error) {
        res.status(400).send("Something went wrong !");
    }
})

//delete user from database by id
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        return res.send("User deleted successfully");
    }
    catch (error) {
        res.status(400).send("Something went wrong !");
    }
})


//update user details by id
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const allowedUpdates = ['skills', 'about', 'photoUrl', 'age', 'gender'];
        const isAllowedUpdate = Object.keys(data).every((update) => allowedUpdates.includes(update));
        if (!isAllowedUpdate) {
            throw new Error("Update not allowed!");
        }
        if (data?.skills.length > 10) {
            throw new Error("You can add maximum 10 skills");
        }
        const user = await User.findByIdAndUpdate(userId, data, { returnDocument: "after", runValidators: true });
        console.log(user);
        return res.send("User Updated successfully");
    }
    catch (error) {
        res.status(400).send("Something went wrong !" + error.message);
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