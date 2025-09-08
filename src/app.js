const express = require("express");

const {userAuth, adminAuth} = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth);

app.post("/users/login",(req,res)=>{
    res.send("User logged in");
})
app.get("/users/data", userAuth,(req,res)=>{
    res.send("All users data");
})

app.get("/admin/getAllData", (req,res)=>{
    res.send("Admin data");
}
)

app.delete("/admin/deleteData", (req,res)=>{
    res.send("Deleted admin data");
})

app.listen("7777");