const express = require("express")
const connectDB = require("./config/database");
const app = express()
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            //Create a JWT Token
            // I am hiding the information of userId inside the token i.e _id:user._id
            // Secret is the password key that basically server know i.e DEV@Developer$790
            const token = await jwt.sign({ _id: user._id }, "DEV@Developer$790")
            console.log(token)
            //Add the token to cookie and send the back response to the user
            res.cookie("token", token);

            res.send("Login Successfully!!!")
        }
        else {
            throw new Error("Invalid Credentials")
        }

    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

app.get("/profile", async (req, res) => {

    try {
            const cookies = req.cookies;
    
            const { token } = cookies;
            if(!token){
                throw new Error("Invalid TOKEN")
            }
            //validate my token
            //token coming in the req and pass the secret key of DEV@Developer$790
            const decodedMessage = await jwt.verify(token, "DEV@Developer$790");
            // console.log(decodedMessage) //{ _id: '66f633408ee05ce00841da6f', iat: 1727411021 }
            // console.log(cookies)
    
            const { _id } = decodedMessage
            //This token is of the specific user
            console.log("Logged in USer is: " + _id)
            const user = await User.findById(_id)
         //suppose the token is valid but user is not exist in the database
         if(!user){
            throw new Error("User does not exist")
         }
            res.send(user);
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }
    
});
//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail });
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
        res.status(500).send("Something went wrong")
    }
})

// Feed API - GET/feed - get all the user from the database
app.get("/feed", async (req, res) => {
    try {
        //to get all object using {}
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})
app.get("/userById", async (req, res) => {
    try {
        const getId = req.body._id;
        if (!getId) {
            return res.status(400).send("ID is required");
        }
        const user = await User.findById(getId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Something went wrong")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete({_id:userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully")
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})


// Update data of the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    // console.log(data)
    try {
        // only this part is ["userId","photoUrl","about","gender","age","skills"] changed 
        //emailId and random thing not updated
        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills can not contain more than 10")
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before", runValidators: true })
        console.log(user)
        res.send("User updated Successfully")
    } catch (error) {
        res.status(500).send("UPDATE FAILED" + error.message)
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
