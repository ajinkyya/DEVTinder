const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require('./models/user');


app.use(express.json());


app.post('/signup', async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User Added sucessfully.")
    } catch(err){
        res.status(400).send("Error saving the user:" + err.message)
    }
    
})

connectDB()
    .then(()=>{
        console.log("Databasse connectionns established");
        app.listen(7777, ()=>{
            console.log("Server is listening on 7777")
        })
    })
    .catch((err)=>{
        console.error("Database cannot be connectd")
    })


