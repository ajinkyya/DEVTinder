const express = require("express");

const app = express();

app.use("/", (req,res)=>{
    res.send("Namaste dev!")
});



app.listen(7777, ()=>{
    console.log("Server is listening on 7777")
})