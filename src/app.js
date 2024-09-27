const express = require("express")
const connectDB = require("./config/database");
const app = express()
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const { userAuth}=require("./middlewares/auth")

//whenever i reading the request i want the data to be parse into json and then I want to get it
app.use(express.json())
app.use(cookieParser())




app.post("/signup", async (req, res) => {
    //validation of the data
    try {
        validateSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body
        //Encrypt the data
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)

        //Creating a new instance of the user Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("User Added Successfully")
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await  user.getJWT();
            console.log(token)
            res.cookie("token", token,{expires: new Date(Date.now() + 8 * 3600000)});

            res.send("Login Successfully!!!")
        }
        else {
            throw new Error("Invalid Credentials")
        }

    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

app.get("/profile",userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }

});
app.post("/sendConnectionRequest",userAuth, async (req, res) => {
    //Send a connection request
    const user = req.user
    console.log("Sending a connection Request")
        res.send(user.firstName + "  sent the connection request");
    }
);


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
