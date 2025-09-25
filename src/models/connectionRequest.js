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
            values: ['accepted', 'interested', 'ignored', 'rejected'],
            message: `{VALUE} is incorrect status type `
        }
    }
},
    { timestamps: true })


    const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);
    module.exports = ConnectionRequest;