const express = require("express");
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("ERROR: " + error.message)
    }

});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        console.log("req.body",req.body)
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        console.log("Before loggedInUser",loggedInUser)
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        console.log("After loggedInUser",loggedInUser)
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser,
          });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
module.exports = profileRouter