const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    console.log(`🔹 JWT_SECRET: ${process.env.JWT_SECRET}`); // Debugging
    //Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("PLEASE LOGIN!");
    }
    // validate the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;
    //find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
