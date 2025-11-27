import mongoose from "mongoose";

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: {
    type: String,
    default: "Admin",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  req_date: {
    type: Date,
    required: true,
  },
});

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;
