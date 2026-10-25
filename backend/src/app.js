const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require('./models/user');
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");


app.use(express.json());


app.post('/signup', async(req,res)=>{
    const user = new User(req.body);
    try{
        // Validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);


        //   Creating a new instance of the User model
        const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        });
        await user.save();
        res.send("User Added sucessfully.")
    } catch(err){
        res.status(400).send("Error saving the user:" + err.message)
    }
    
})
app.get('/user',async (req,res)=>{
    try{
        const user = await User.find(req.body);
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

app.get('/feed',async (req,res)=>{
    try{
        const users = await User.find({});
        if(!users){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});
app.delete('/user', async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.body.userId);
        res.send("user deleted sucessfully")
    }catch(err){
        res.status(400).send("Something went Wrong!")
    }
});

app.patch('/user/:userId', async(req,res)=>{
    const userId = req.params?.userId;
    try{
        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];
        const isUpdateAllowed = Object.keys(req.body).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }
        if (req.body?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }
        await User.findByIdAndUpdate(userId, req.body,{
            returnDocument:"after",
            runValidators:true
        });
        res.send("User Updated  Sucessfully")
    }catch(err){
        res.status(400).send("Update Failed : " + err.message)
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


