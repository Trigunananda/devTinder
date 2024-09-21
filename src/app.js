const express = require("express")

const app = express()
// app.get("/user", (req, res) => {
//     // GET http://localhost:7777/user?userId=101
//     console.log(req.query) //{ userId: '101' }
//     res.send({ firstName: "Triguna", lastName: "Swain" });
// });
app.get("/user/:userId/:name/:password", (req, res) => {
    // GET http://localhost:7777/user/101/triguna/testing
    console.log(req.params) //{ userId: '101', name: 'triguna', password: 'testing' }
    res.send({ firstName: "Triguna", lastName: "Swain" });
});
app.post("/user", (req, res) => {
    console.log("Save Data to the database")
    res.send("Data successfully saved to the database");
});
app.delete("/user", (req, res) => {
    res.send("Data deleted successfully");
});
//request Handler
app.use("/test", (req, res) => {
    res.send("Hello from the server");
});
// app.use("/",(req,res)=>{
//     res.send("Namaste Triguna");
//     });
app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...")
})