const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");;
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    //Send a connection request
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res
                .status(400)
                .json({ message: "Invalid status type: " + status });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
        if (existingConnectionRequest) {
            return res
                .status(400)
                .send({ message: "Connection Request Already Exists!!" });
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message:
                req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        });
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
}
);
requestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            const { status, requestId } = req.params;

            const allowedStatus = ["accepted", "rejected"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message: "Status not allowed!" });
            }
            // Find the connection request without limiting it to a specific status
            const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id
            });
            if (!connectionRequest) {
                return res
                    .status(404)
                    .json({ message: "Connection request not found" });
            }

            // Check if the connection request is already accepted or rejected
            if (connectionRequest.status === "accepted" || connectionRequest.status === "rejected") {
                return res.status(400).json({
                    message: `Connection request has already been ${connectionRequest.status}.`
                });
            }

            // Check if the current status is 'interested', which allows further processing
            if (connectionRequest.status !== "interested") {
                return res.status(400).json({
                    message: "Connection request cannot be processed in its current state."
                });
            }
            connectionRequest.status = status;

            const data = await connectionRequest.save();

            res.json({ message: "Connection request " + status, data });
        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);


module.exports = requestRouter