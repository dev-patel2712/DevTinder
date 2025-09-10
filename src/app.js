const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")


app.use(express.json());

//signup route to create a new user
app.post('/signup', async(req,res)=>{
    
    const user = new User(req.body)
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch(error){
        res.status(400).send("Error saving the user:",error.message);
    }

})

//get all users by emailId 

app.get('/users', async(req,res)=>{
    
    const userEmail = req.body.emailId;
       try{
        const users = await User.find({emailId:userEmail});
        if(users.length===0){
            return res.status(404).send("No user found with this emailId");
        }
        else{
            res.send(users);
        }
    }
    catch(error){
        res.status(400).send("Something went wrong !");
    }

})

//Feed route to get all users

app.get('/feed', async(req,res)=>{
    
       try{
        const users = await User.find({});
        if(users.length===0){
            return res.status(404).send("No user found");
        }
        else{
            res.send(users);
        }
    }
    catch(error){
        res.status(400).send("Something went wrong !");
    }

})


//get only one user by emailId with findOne method (even if two users have same emailId it will return only one user)

app.get('/user', async(req,res)=>{
    const userEmail = req.body.emailId;
       try{
        const user = await User.findOne({emailId:userEmail});
        if(!user){
            return res.status(404).send("No user found with this emailId");
        }
        else{
            res.send(user);
        }
    }
    catch(error){
        res.status(400).send("Something went wrong !");
    }
})


connectDB().then(()=>{
console.log("DB connected successfully");
app.listen("7777",()=>{
    console.log("Server is succesfully listening on port 7777")
});
}).catch((err)=>{
    console.error("DB not connected",err);
})