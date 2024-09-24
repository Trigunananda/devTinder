const express = require("express")
const connectDB = require("./config/database");
const app = express()
const User = require("./models/user")

//it reads the JSON object and convert the JS object to request
app.use(express.json())
app.post("/signup", async (req, res) => {


 // Cretaing a new instance of the user model
    const user = new User(req.body);
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
