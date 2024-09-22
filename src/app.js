// const express = require("express")

// const app = express()
// // rh -> route handler
// // app.use("/route",rh,[rh2,rh3],rh4,rh5)

// //GET /users =>middleware chain=>Request handler
// app.use("/",(req,res,next)=>{
// next();
// })
// app.get("/user",
//     (req, res, next) => {
//         //Route Handler
//         console.log("Handling the route user!!")

//         next();
//         // res.send("Response");
//     }, (req, res,next) => {
//         //another Route Handler
//         console.log("Handling the route user2!!")
//         // res.send("Response2!!");
//         next();
//     }, (req, res,next) => {
//         //another Route Handler
//         console.log("Handling the route user3!!")
//         res.send("Response3!!");
//     }
// );

// app.listen(7777, () => {
//     console.log("Server is successfully listening on port 7777...")
// })



const express = require("express")
const { adminAuth, userAuth } = require("./middlewares/auth")
const app = express()
app.use("/admin", adminAuth)
app.post("/user/login", (req, res) => {
    res.send("User logged in successfully!")
})
app.get("/user/data", userAuth, (req, res) => {
    res.send("User Data sent")
})
app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent")
})
app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...")
})