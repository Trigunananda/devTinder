const express = require("express")
const connectDB=require("./config/database");
const app = express()
const User = require("./models/user")

app.post("/signup",async (req,res)=>{
    const userObj = {
        firstName:"Balia",
        lastName:"swain",
        emailId:"swain.com",
        password:"swain123"
    }
    // Cretaing a new instance of the user model
    const user = new User(userObj);
  try {
     await user.save();
     res.send("User Added Successfully")
  } catch (error) {
    res.status(400).send("Error saving the user:" + err.message)
  }
})

connectDB().then(() => {
    //1st database connection
    console.log("Database connection Established...")
    //then connect the server
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777...")
    })
}).catch(() => {
    console.log("Database cannot be connected!!")
})
