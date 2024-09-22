const express = require("express")
const { adminAuth, userAuth } = require("./middlewares/auth")
const app = express()

//error should be first parameter
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})
app.get("/getUserData", (req, res) => {
    // try {
        //logic of DB call and get user data
        throw new Error("jdzhg")
        res.send("User data sent")
    // } 
    // catch (error) {
    //    res.status(500).send("Some error contact suppoet team") 
    // }
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})
app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...")
})