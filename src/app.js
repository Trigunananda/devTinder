const express = require("express")
const connectDB = require("./config/database");
const app = express()
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added Successfully")
    } catch (error) {
        res.status(400).send("Error saving the user:" + err.message)
    }
})
//Get user by email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    try {
        const user =  await User.findOne({emailId:userEmail});
        if (user) {
            res.send(user)
        } else {
            res.status(404).send("User not found!!!")
        }
    //   const users =  await User.find({emailId:userEmail});
    //   if(users.length === 0){
    //     res.status(404).send("User not found")
    //   }else{
    //     res.send(users)
    //   }
       
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

// Feed API - GET/feed - get all the user from the database
app.get("/feed",async(req,res)=>{
try {
    //to get all object
    const users = await User.find({})
    res.send(users)
} catch (error) {
    res.status(400).send("Something went wrong")
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
