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
        res.status(500).send("Error saving the user:" + error.message)
    }
})
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
