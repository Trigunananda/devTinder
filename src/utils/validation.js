const validator = require("validator")
const validateSignUpData=(req)=>{
    const{firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    // else if(firstName.length<5 || firstName.length>25){
    //     throw new Error("firstbame should be 4-50 characters")
    // }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}
module.exports={
    validateSignUpData 
}