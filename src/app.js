const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.post('/signup', async(req,res)=>{
    
    const user = new User({
        firstName:"Dev",
        lastName:"Patel",
        emailId:"dev@demo.com",
        password:"Test@123"
    })
    try{
        user.save();
        res.send("User added successfully");
    }
    catch(error){
        res.status(400).send("Error saving the user:",error.message);
    }

})

connectDB().then(()=>{
console.log("DB connected successfully");
app.listen("7777",()=>{
    console.log("Server is succesfully listening on port 7777")
});
}).catch((err)=>{
    console.error("DB not connected");
})