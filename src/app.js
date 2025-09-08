const express = require("express");

const app = express();

app.get("/users",(req,res)=>{
    res.send({firstName:"Dev", lastName:"Patel"});
})

app.post("/users",(req,res)=>{
    res.send("Data saved to db successfully");
})

app.patch("/users",(req,res)=>{
    res.send("Data updated successfully");
})

app.delete("/users",(req,res)=>{
    res.send("Data deleted successfully");
}
)
app.use("/test",(req,res)=>{
    res.send("hello from the server");
})

app.listen("7777");