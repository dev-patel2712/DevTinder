const express = require('express');
const userAuth = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();



//Send connection request api
requestRouter.post('/connectionRequest/:status/:toUserId', userAuth, async (req, res) => {

    try {
        const user = req.user;
        const fromUserId = user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatuses = ['ignored', 'interested']
        const isStatusValid = allowedStatuses.includes(req.params.status)
        if (!isStatusValid) {
            return res.status(400).json({
                message: "Invalid status type: " + req.params.status
            })
        }

        const isUserPresent = await User.findById(req.params.toUserId)
        if (!isUserPresent) {
            return res.status(400).send("No user found with this id")
        }

        const existingConnectionrequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ]
        })
        if(existingConnectionrequest){
            return res.status(400).json({
                message: "Connection request already exists"
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId : user._id ,toUserId,status,
        })

        await connectionRequest.save();
        res.json({
            message:"Connection request sent successfully from"
        })


    }
    catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

})


module.exports = requestRouter;