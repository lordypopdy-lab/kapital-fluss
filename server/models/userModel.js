import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    require: false,
    default: "first-name",
  },
  lastName: {
    type: String,
    required: false,
    default: "last-name",
  },
  verification: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_pic: {
    type: String,
    required: false,
    default: "",
  },
  country: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profit: {
    type: Number,
    default: 0,
    required: false,
  },
  deposit: {
    type: Number,
    default: 0,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
    default: "+1---",
  },
  streetAddress: {
    type: String,
    required: false,
    default: "123 Main St",
  },
  transaction_fee: {
    type: Number,
    required: false,
    default: 0,
  },
  city: {
    type: String,
    required: false,
    default: "New York",
  },
  zip_code: {
    type: Number,
    required: false,
    default: "10001",
  },
  state_province: {
    type: String,
    required: false,
    default: "NY",
  },
  bonuse: {
    type: Number,
    default: 0,
    required: false,
  },
  req_date: {
    type: Date,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
