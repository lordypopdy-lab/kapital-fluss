import mongoose from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    tmp_stp: {
        type: Date,
        required: true
    }
})

const chatModel = mongoose.model("chat", chatSchema);
export default chatModel;