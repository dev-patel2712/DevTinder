const mongoose = require("mongoose");
const validator = require("validator");


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enums: {
            values: ['accepted', 'rejected','interested', 'ignored'],
            message: `{VALUE} is incorrect status type `
        }
    }
},
    { timestamps: true })


connectionRequestSchema.pre('save',function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error ("cannot send request to yourself");
    }
    next();
})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequest;