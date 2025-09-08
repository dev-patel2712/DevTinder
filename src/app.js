const express = require("express");

const app = express();

// app.get("/users/:userId/:name/:password",(req,res)=>{
//     console.log(req.params);
//     res.send({firstName:"Dev", lastName:"Patel"});
// })

app.get("/users",(req,res)=>{
    console.log(req.query);
    res.send({firstName:"Dev", lastName:"Patel"});
})

app.listen("7777");