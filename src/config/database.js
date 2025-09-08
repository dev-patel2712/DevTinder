const mongoose = require('mongoose')
const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://hiraparadevdh_db_user:5fk7CyOX8BYKS364@cluster0.6wnbmw3.mongodb.net/devTinder");
}

module.exports=connectDB;