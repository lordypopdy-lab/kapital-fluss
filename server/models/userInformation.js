import mongoose from "mongoose";
const { Schema } = mongoose;

const userInfoSchema = new Schema({
    email: String,
    Id: String,
    Country: String,
    IdProfile: String
})
const userInfomationModel = mongoose.model('userInformation', userInfoSchema);
export default userInfomationModel;