const mongoose = require("mongoose");
var validator = require('validator');
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 25,
        },
        lastName: {
            type: String,
            minLength: 5,
            maxLength: 25,
        },
        emailId: {
            type: String,
            minLength: 5,
            maxLength: 25,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email Address" + value)
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter a strong Password  " + value)
                }
            }
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
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSBnJ1jac5WWtVhWh-XPZqN8bglxnDy3bURim1BiRPikxTcyexME-WDF1pYw&s",
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("Invalid Photo URL  " + value)
                }
            }
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