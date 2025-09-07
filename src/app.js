const express = require("express");

const app = express();


app.use("/test",(req,res)=>{
    res.send("hii this is test");
})

app.use("/hello",(req,res)=>{
    res.send("hii this is hello");
})

app.use("/",(req,res)=>{
    res.send("Hello, Dev");
})

app.listen("7777");