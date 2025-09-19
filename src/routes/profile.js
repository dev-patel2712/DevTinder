const express = require('express');
const userAuth = require('../middlewares/auth');
const profileRouter = express.Router();
const { validateEditProfileRequestData } = require('../utils/validation')
const bcrypt = require("bcrypt");


//Get Profile route to get user profile

profileRouter.get('/profile/view', userAuth, async (req, res) => {

    try {

        const user = req.user;
        res.send(user);

    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})



profileRouter.patch('/profile/edit', userAuth, async (req, res) => {

    try {
        const isEditAllowed = validateEditProfileRequestData(req)
        if (!isEditAllowed) {
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName} , your profile updated Successfully`,
            data: loggedInUser
        })

    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})


profileRouter.patch('/profile/editPassword', userAuth, async (req, res) => {

    try {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;
        const currentPasswordSentByUser = currentPassword
        const currentExistingPassword = user.password
        const isPasswordCorrect = await bcrypt.compare(currentPasswordSentByUser, currentExistingPassword);
        if (!isPasswordCorrect) {
            throw new Error("Wrong password entered")
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;
        await user.save();
        res.json({
            message: `${user.firstName} , your password updated Successfully`,
        })


    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})


module.exports = profileRouter;
