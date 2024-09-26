const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        lastName: {
            type: String,
            minLength: 5,
            maxLength: 50,
        },
        emailId: {
            type: String,
            minLength: 5,
            maxLength: 50,
            lowercase: true,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            minLength: 6,
            maxLength: 15,
            required: true
        },
        age: {
            type: String,
            min: 18
        },
        gender: {
            type: String,
            minLength: 1,
            maxLength: 15,
            // when creating new object at this time validate function run
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid")
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSBnJ1jac5WWtVhWh-XPZqN8bglxnDy3bURim1BiRPikxTcyexME-WDF1pYw&s"
        },
        about: {
            type: String,
            default: "This is a default about of the User"
        },
        skills: {
            type: [String]
        }
    }, {
    // created at and updated at for the register user by default
    timestamps: true
}
)
const User = mongoose.model("User", userSchema)
module.exports = User