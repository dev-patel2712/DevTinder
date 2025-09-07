const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("hii this is test");
})

app.use("/hello",(req,res)=>{
    res.send("hii this is hello");
})

app.listen("7777");