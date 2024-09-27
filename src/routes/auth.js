const express = require("express");
const authRouter = express.Router()
const User = require("../models/user")
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

authRouter.post("/signup", async (req, res) => {
    //validation of the data
    try {
        validateSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body
        //Encrypt the data
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)

        //Creating a new instance of the user Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("User Added Successfully")
    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            console.log(token)
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

            res.send("Login Successfully!!!")
        }
        else {
            throw new Error("Invalid Credentials")
        }

    } catch (error) {
        res.status(400).send("ERROR : " + error.message)
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
});

module.exports = authRouter