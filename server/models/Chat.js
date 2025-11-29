import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // "admin" or userId
  receiver: { type: String, required: true }, // "admin" or userId
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

export default mongoose.model("Chat", chatSchema);
