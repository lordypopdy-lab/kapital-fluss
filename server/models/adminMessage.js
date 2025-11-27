import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    userID: {
        type: String,
        required: false
    },
    submitMessage: {
        type: String,
        required: false,
    },
    notification: {
        type: String,
        required: false
    }
})

const messageModel = mongoose.model("notification", messageSchema);
export default messageModel;