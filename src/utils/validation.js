const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, password, emailId } = req.body;
    if (!firstName || !lastName) {
        throw new Error("First name and last name are required");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Valid emailId is required");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
}


const validateLoginData = (req) => {
    const { emailId ,password} = req.body;
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Valid emailId is required");
    }
    else if(password.length === 0)
    {
        throw new Error("Password is required")
    }
}



const validateEditProfileRequestData= (req) => {
    const allowedEditFields=[
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ]

    const isEditAllowed = Object.keys(req.body).every((field)=>{
        return allowedEditFields.includes(field);
    })

    return isEditAllowed;
}

module.exports = { validateSignupData ,validateLoginData,validateEditProfileRequestData};