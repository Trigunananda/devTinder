const express = require("express");
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const validator = require("validator")
const { validateEditProfileData, validatePassword } = require("../utils/validation");
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
        console.log("req.body", req.body)
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        console.log("Before loggedInUser", loggedInUser)
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        console.log("After loggedInUser", loggedInUser)
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
// Update password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Check if the old password and new password are provided
        if (!oldPassword || !newPassword) {
            throw new Error("Old password and new password are required.");
        }

        const loggedInUser = req.user;
        console.log("loggedInUser", loggedInUser)
        // Validate the old password
        const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
        if (!isPasswordValid) {
            throw new Error("Old password is incorrect.");
        }

        // Validate the new password strength using validator or similar
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("The new password must be strong (include uppercase, lowercase, numbers, and special characters).");
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        loggedInUser.password = await bcrypt.hash(newPassword, salt);

        // Save the updated user information
        await loggedInUser.save();

        res.status(200).send(
            "Password updated successfully.",
          );
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter