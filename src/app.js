const express = require("express");

const app = express();


app.get("/users/getAllData",(req,res)=>{
    throw new Error("Some error occured");
    res.send("All users data");
})

app.use('/',(err,req,res,next)=>{
res.status(500).send("Something wnet wrong");
});


app.listen("7777");