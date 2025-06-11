const express = require("express")
const connectDB = require("./config/database");
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors")
const http = require("http")

require('dotenv').config()
require("./utils/cornjob");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    }
));


//whenever i reading the request i want the data to be parse into json and then I want to get it
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",paymentRouter);

const server = http.createServer(app)
initializeSocket(server)

    
connectDB().then(() => {
    //1st database connection
    console.log("Database connection Established...")
    //then connect the server
    server.listen(process.env.PORT, () => {
        console.log("Server is successfully listening on port 7777...")
    })
}).catch(() => {
    console.log("Database cannot be connected!!")
})
