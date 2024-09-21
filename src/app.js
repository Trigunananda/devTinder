const express = require("express")

const app = express()
app.get("/user", (req, res) => {
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