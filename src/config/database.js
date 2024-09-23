const mongoose = require("mongoose");
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://swaint214:Admin123@cluster0.tka74kg.mongodb.net/devTinder");
}
module.exports=connectDB