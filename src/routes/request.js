const express = require("express");
const requestRouter = express.Router();
const { userAuth}=require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth, async (req, res) => {
    //Send a connection request
    const user = req.user
    console.log("Sending a connection Request")
        res.send(user.firstName + "  sent the connection request");
    }
);

module.exports = requestRouter