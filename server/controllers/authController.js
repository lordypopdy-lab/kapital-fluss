import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import OtpModel from "../models/OtpModel.js";
import bankModel from "../models/bankModel.js";
import chatModel from "../models/chatModel.js";
import cryptoModel from "../models/cryptoModel.js";
import adminMessage from "../models/adminMessage.js";
import userInfomation from "../models/userInformation.js";
import accountUpgradeModel from "../models/accountLevel.js";

import { hashPassword, comparePassword } from "../helpers/auth.js";
import mongoose from "mongoose";

import { sendEmail } from "../utils/emailService.js";

export const getUserVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const otpStatus = await OtpModel.findOne({ email });

    if (!otpStatus) {
      return res.json({
        status: "failed",
        message: "No record found",
      });
    }

    return res.json({
      status: "success",
      data: otpStatus,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.body;

    const deletedUser = await User.findByIdAndDelete(userID);

    if (!deletedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.json({ success: true, msg: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    if (!sender || !receiver || !message) {
      return res.status(400).json({ error: "sender, receiver, message are required" });
    }

    const newMsg = new Chat({
      sender,
      receiver,
      message,
    });

    await newMsg.save();

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMsg,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const msgs = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ time: 1 });

    res.status(200).json(msgs);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await Chat.findByIdAndDelete(id);

    res.json({ success: true, msg: "Message deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const adminReply = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const adminMsg = await Chat.create({
      userId,
      sender: "admin",
      message,
    });

    res.status(201).json({ success: true, chat: adminMsg });
  } catch (error) {
    console.error("Admin Reply Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const DeclineKyc = async (req, res) => {
  const { kycDecline } = req.body;

  const kycDec = await OtpModel.updateOne({_id: kycDecline}, {$set: {kycStatus: "Declined"}});
  if(kycDec){
    return res.json({
      success: "Kyc Declined Successfully!"
    })
  }

  return res.json({
    error: "Error Declining Kyc"
  })
}

const DeleteKyc = async (req, res) => {
  const { kycAction } = req.body;
  const deleteAction = await OtpModel.deleteOne({_id: kycAction});

  if(deleteAction){
    return res.json({
      success: "Kyc Request deleted succesfully!"
    })
  }

  return res.json({
    error: "Error Deleting Kyc Request"
  })
}

const ApproveKyc = async (req, res) => {
  const { kycApprove } = req.body;

  const kycDec = await OtpModel.updateOne({_id: kycApprove}, {$set: {kycStatus: "Approved"}});
  if(kycDec){
    return res.json({
      success: "Kyc Approved Successfully!"
    })
  }

  return res.json({
    error: "Error Approving Kyc"
  })
}

const fetchAllKyc = async (req, res) => {
  const kyc = await OtpModel.find({});
  return res.json({
    kyc: kyc
  })
}

const fetchKyc = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      error: "Email Required!"
    })
  }

  const ifVerifiedOtp = await OtpModel.findOne({ email: email });

  if (ifVerifiedOtp && ifVerifiedOtp.kycStatus === "Verified") {
    return res.json({
      status: "Verified"
    })
  }

  if (ifVerifiedOtp && ifVerifiedOtp.kycStatus === "Inreview") {
    return res.json({
      status: "Inreview"
    })
  }

  return res.json({
    status: "Unverified"
  })
}

const fetchOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      error: "Email Required!"
    })
  }

  const ifVerifiedOtp = await OtpModel.findOne({ email: email });

  if (ifVerifiedOtp && ifVerifiedOtp.status === "Verified") {
    return res.json({
      status: "Verified"
    })
  }

  return res.json({
    status: "Unverified"
  })
}

const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.json({
      error: "Please Enter OTP Code before submiting!"
    })
  }

  const ifCorrect = await OtpModel.findOne({ Otp: otp });
  if (!ifCorrect) {
    return res.json({
      error: "Incorrect OTP, Please Re-Check Yout E-Mail for New OTP"
    })
  }

  await OtpModel.updateOne({ Otp: otp }, { $set: { status: "Verified" } });
  return res.status(200).json({
    success: "Successfuly Verified OTP"
  })
}

const getOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      error: "email is required to request for OTP"
    })
  }

  // Generate OTP
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

  const otp = generateOTP();

  // Email Template
  const emailHTML = `
    <div>
      <p>Hi <b>${email}</b>,</p>
      <p>Your verification code is:</p>
      <h2>${otp}</h2>
      <p>This code will expire in 15 minutes.</p>
      <p>If you didn’t request this, ignore the email.</p>
      <br/>
      <p>Thanks,</p>
      <p><b>Your App Team</b></p>
    </div>
  `;

  try {
    // Send using Resend
    const sent = await sendEmail(email, "Your OTP Code", emailHTML);

    if (!sent) {
      return res.status(500).json({ error: "Failed to send OTP" });
    }

    // Save or update OTP in DB
    const ifExist = await OtpModel.findOne({ email });

    if (ifExist) {
      await OtpModel.updateOne({ email }, { $set: { Otp: otp } });

      return res.json({
        message: "OTP Sent Successfully!",
        OTP: otp,
      });
    }

    await OtpModel.create({ email, Otp: otp });

    return res.json({
      message: "OTP Sent Successfully!",
      OTP: otp,
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "Internal error" });
  }
};

const citizenId = async (req, res) => {
  const { email, imgSrc } = req.body;

  const checkIF = await OtpModel.findOne({ email: email });

  if (checkIF) {
    await OtpModel.updateOne({ email: email }, { $set: {kycStatus: "Inreview", kycPic: imgSrc} });
    const updateUserPic = await userInfomation.updateOne(
      { email: email },
      { $set: { IdProfile: imgSrc } }
    );
    const updateUser = await User.updateOne(
      { email: email },
      { $set: { citizenId: `${imgSrc}`, verification: `Inreview` } }
    );
    if (updateUser && updateUserPic) {
      return res.json({
        success: "Success",
      });
    }
  } else {
    await OtpModel.create({
      email: email,
      Otp: "",
      status: "Unverified",
      kycStatus: "Inreview",
      kycPic: imgSrc
    })

    const updateUserPic = await userInfomation.updateOne(
      { email: email },
      { $set: { IdProfile: imgSrc } }
    );
    const updateUser = await User.updateOne(
      { email: email },
      { $set: { citizenId: `${imgSrc}`, verification: `Inreview` } }
    );
    if (updateUser && updateUserPic) {
      return res.json({
        success: "Success",
      });
    }
  }

};

const userInfo = async (req, res) => {
  const { email, Id, Country } = req.body;
  const check = await userInfomation.findOne({ email });
  if (check) {
    const update = await userInfomation.updateOne(
      { email: email },
      { $set: { email: `${email}`, Id: `${Id}`, Country: `${Country}` } }
    );
    if (update) {
      return res.json({
        message: "Updated",
      });
    }
  }
  const create = await userInfomation.create({
    email,
    Id,
    Country,
  });
  if (create) {
    return res.json({
      message: "success",
    });
  }
};

/////////////////////////-----GENERAL FUNCTIONALITY SECTION-----///////////////////////////////
/////////////////////////---------------------------------------///////////////////////////////
/////////////////////////---------------------------------------///////////////////////////////
/////////////////////////---------------------------------------///////////////////////////////

const uploadProfilePic = async (req, res) => {
  try {
    const { id } = req.body;

    if (!req.file) {
      return res.json({ status: "error", message: "No image uploaded!" });
    }

    // Convert buffer → base64
    const base64Image = req.file.buffer.toString("base64");

    // Add prefix e.g. data:image/png;base64,...
    const finalImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // Save to DB
    await User.updateOne({ _id: id }, { profile_pic: finalImage });

    return res.json({
      status: "success",
      message: "Profile picture updated successfully",
      profile_pic: finalImage,
    });
  } catch (err) {
    console.error(err);
    return res.json({ status: "error", message: "Upload failed!" });
  }
};

const ressetPassword = async (req, res) => {
  const { id, current, newPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({ status: "error", message: "No user found" });
    }

    const match = await comparePassword(current, user.password);
    if (!match) {
      return res.json({
        status: "error",
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });

    return res.json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.json({ status: "error", message: "Server error" });
  }
};

const updatePersonalDetails = async (req, res) => {
  const { id, firstName, lastName, email, phoneNumber } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({ status: "error", message: "Unidentified user!" });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail && existingEmail._id.toString() !== id) {
      return res.json({
        status: "error",
        message: "Email already in use!",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
      { new: true }
    );

    return res.json({
      status: "success",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const updateAddressInfo = async (req, res) => {
  const { id, Street_Address, city, state_province, zip_code, country } =
    req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({ status: "error", message: "Unidentified user!" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        streetAddress: Street_Address,
        city,
        state_province,
        zip_code,
        country,
      },
      { new: true }
    );

    return res.json({
      status: "success",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const getAccountLevel = async (req, res) => {
  const { ID } = req.body;
  const ifExist = await accountUpgradeModel.findOne({ userID: ID });

  if (ifExist) {
    return res.json({
      Level: ifExist,
    });
  }
};

const upgradeAccount = async (req, res) => {
  try {
    const { ID, ULevel } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
      return res.json({ error: "Invalid user ID format" });
    }

    const checkUser = await User.findById(ID);
    if (!checkUser) {
      return res.status(404).json({ error: "User ID not found" });
    }

    const ifExist = await accountUpgradeModel.findOne({ userID: ID });

    if (!ifExist) {
      await accountUpgradeModel.create({
        userID: ID,
        accountLevel: ULevel,
      });

      return res.json({
        success: `User ${ID} has been upgraded to ${ULevel}`,
      });
    }

    if (ifExist.accountLevel === ULevel) {
      return res.json({
        error: `User account is already at ${ifExist.accountLevel}`,
      });
    }

    await accountUpgradeModel.updateOne(
      { userID: ID },
      { $set: { accountLevel: ULevel } }
    );

    return res.json({
      success: `User ${ID} has been upgraded to ${ULevel}`,
    });
  } catch (error) {
    console.error("Error upgrading account:", error);
    return res.json({ error: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  const { ID } = req.body;

  const getNoti = await adminMessage.findOne({ userID: ID });

  if (getNoti) {
    return res.json(getNoti);
  }

  return res.json({ data: "No data" });
};

const getNotification = async (req, res) => {
  const { ID } = req.body;
  const getNoti = await adminMessage.findOne({ userID: ID });

  if (getNoti) {
    return res.json(getNoti);
  }

  return res.json({ data: "No data" });
};

const Delete = async (req, res) => {
  const { id } = req.body;

  const checkBank = await bankModel.findOne({ _id: id });
  const checkCrypto = await cryptoModel.findOne({ _id: id });

  if (checkBank) {
    await bankModel.deleteOne({ _id: id });
    return res.json({
      success: "Transaction Deleted Successfully!",
    });
  }

  if (checkCrypto) {
    await cryptoModel.deleteOne({ _id: id });
    return res.json({
      success: "Transaction Deleted Successfully!",
    });
  }

  return res.json({
    error: "Unidentify transaction ID",
  });
};

const Approve = async (req, res) => {
  const { id } = req.body;

  const checkBank = await bankModel.findOne({ _id: id });
  const checkCrypto = await cryptoModel.findOne({ _id: id });

  if (checkBank) {
    await bankModel.updateOne({ _id: id }, { $set: { status: "Approved" } });
    return res.json({
      success: "Transaction approved Successfully!",
    });
  }

  if (checkCrypto) {
    await cryptoModel.updateOne({ _id: id }, { $set: { status: "Approved" } });
    return res.json({
      success: "Transaction Approved Successfully!",
    });
  }

  return res.json({
    error: "Unidentify transaction ID",
  });
};

const Decline = async (req, res) => {
  const { id } = req.body;

  const checkBank = await bankModel.findOne({ _id: id });
  const checkCrypto = await cryptoModel.findOne({ _id: id });

  if (checkBank) {
    await bankModel.updateOne({ _id: id }, { $set: { status: "Declined" } });
    return res.json({
      success: "Transaction Declined Successfully!",
    });
  }

  if (checkCrypto) {
    await cryptoModel.updateOne({ _id: id }, { $set: { status: "Declined" } });
    return res.json({
      success: "Transaction Declined Successfully!",
    });
  }

  return res.json({
    error: "Unidentify transaction ID",
  });
};

const userNotification = async (req, res) => {
  const { id, value } = req.body;
  if (!id) {
    return res.json({
      error: "userID and notification field is required! to send Message",
    });
  }

  if (!value) {
    return res.json({
      error: "userID and notification field is required! to send Message",
    });
  }

  check01 = await adminMessage.findOne({ userID: id });
  if (check01) {
    await adminMessage.updateOne(
      { userID: id },
      { $set: { notification: value } }
    );
    return res.json({
      success: "Notification sent",
    });
  }

  await adminMessage.create({
    userID: id,
    notification: value,
  });

  return res.json({
    success: "Notification sent",
  });
};

const notificationAdder = async (req, res) => {
  const { id, value } = req.body;

  if (!id) {
    return res.json({
      error: "userID and message field is required! to send Message",
    });
  }

  if (!value) {
    return res.json({
      error: "userID and message field is required! to send Message",
    });
  }

  check01 = await adminMessage.findOne({ userID: id });
  if (check01) {
    await adminMessage.updateOne(
      { userID: id },
      { $set: { submitMessage: value } }
    );
    return res.json({
      success: "message sent",
    });
  }

  await adminMessage.create({
    userID: id,
    submitMessage: value,
  });

  return res.json({
    success: "message sent",
  });
};

const deleteChat = async (req, res) => {
  const { id } = req.body;
  const deleted = await chatModel.deleteOne({ _id: id });
  if (deleted) {
    return res.json({
      success: "Chat Deleted",
    });
  }
};

const chatSend = async (req, res) => {
  const { value, from, email } = req.body;

  if (!value) {
    return res.json({
      error: "Message field is required",
    });
  }

  if (!from) {
    return res.json({
      error: "unidentified User",
    });
  }

  if (!email) {
    return res.json({
      error: "Email Not Found",
    });
  }
  const createNewChat = await chatModel.create({
    from: from,
    email: email,
    message: value,
    tmp_stp: new Date(),
  });

  if (createNewChat) {
    const chat = await chatModel.find({ email: email });
    return res.json({
      chat: chat,
    });
  }
};

const getAdminChat = async (req, res) => {
  const { email } = req.body;

  const getChat = await chatModel.find({ email: email });
  if (getChat) {
    return res.json({
      chat: getChat,
    });
  }

  res.json({
    message: "No Chat Available",
  });
};

const AdminGetCrypto = async (req, res) => {
  const { email } = req.body;
  const ifAdmin = await Admin.findOne({ email: email });
  if (ifAdmin) {
    const bankR = await cryptoModel.find();
    return res.json(bankR);
  }

  return res.json({
    error: "Unidentify Admin 404",
  });
};

const AdminGetBankR = async (req, res) => {
  const { email } = req.body;

  const ifAdmin = await Admin.findOne({ email: email });
  if (ifAdmin) {
    const bankR = await bankModel.find();
    return res.json(bankR);
  }

  return res.json({
    error: "Unidentify Admin 404",
  });
};

const getCryptoRecords = async (req, res) => {
  const { email } = req.body;
  const find = await cryptoModel.find({ email: email });

  if (find) {
    return res.json(find);
  }

  return res.json({});
};

const getBankRecords = async (req, res) => {
  const { email } = req.body;

  const find = await bankModel.find({ email: email });

  if (find) {
    return res.json(find);
  }

  return res.json({});
};

const getUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({
      error: "unidentyfied user",
    });
  }
  return res.json(user);
};

const withdrawCrypto = async (req, res) => {
  const { email, value, walletAddress } = req.body;

  if (!value || value <= 10) {
    return res.json({
      error: "Amount must be provided and must be greater than 10",
    });
  }

  if (!walletAddress) {
    return res.json({
      error: "A valid wallet address is required",
    });
  }

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    return res.status(404).json({
      error: "Invalid request, Unidentify user",
    });
  }

  if (findUser.deposit >= value) {
    await cryptoModel.create({
      amount: value,
      email: email,
      cryptoAddress: walletAddress,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { deposit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.profit >= value) {
    await cryptoModel.create({
      amount: value,
      cryptoAddress: walletAddress,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { profit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.bonuse >= value) {
    await cryptoModel.create({
      amount: value,
      cryptoAddress: walletAddress,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { bonuse: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.deposit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.profit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.bonuse <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }
};

const withdrawBank = async (req, res) => {
  const { email, value, bank_name, account_name, account_number, swift_code } =
    req.body;

  if (!value || value <= 10) {
    return res.json({
      error: "Amount is required and must be greater than 10",
    });
  }

  if (!bank_name) {
    return res.json({
      error: "Bank name must be provided, to sign Withdrawal",
    });
  }

  if (!account_name) {
    return res.json({
      error: "Account Name must be provided, to sign Withdrawal",
    });
  }

  if (!account_number) {
    return res.json({
      error: "Account number must be provided, to sign Withdrawal",
    });
  }

  if (!swift_code) {
    return res.json({
      error: "Swift-Code must be provided, to sign Withdrawal",
    });
  }

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    return res.status(404).json({
      error: "Invalid request, Unidentify user",
    });
  }

  console.log(findUser.deposit);
  if (findUser.deposit >= value) {
    await bankModel.create({
      amount: value,
      bank: bank_name,
      name: account_name,
      swiftCode: swift_code,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { deposit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.profit >= value) {
    await bankModel.create({
      amount: value,
      bank: bank_name,
      name: account_name,
      swiftCode: swift_code,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { profit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.bonuse >= value) {
    await bankModel.create({
      amount: value,
      bank: bank_name,
      name: account_name,
      swiftCode: swift_code,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { bonuse: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.deposit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.profit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.bonuse <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }
};

const addBalance = async (req, res) => {
  const { id, value, type } = req.body;

  if (!id) {
    return res.json({
      error: "user ID must be provided!",
    });
  }

  if (!value || value < 1) {
    return res.json({
      error: "value to be added is needed and must be greater than 0",
    });
  }

  if (type == "deposit") {
    await User.updateOne({ _id: id }, { $set: { deposit: value } });
    return res.status(200).json({
      success: "Deposit Balance Added Successfully!",
    });
  }

  if (type == "bonuse") {
    await User.updateOne({ _id: id }, { $set: { bonuse: value } });
    return res.status(200).json({
      success: "Bonuse Balance Added Successfully!",
    });
  }

  if (type == "profit") {
    await User.updateOne({ _id: id }, { $set: { profit: value } });
    return res.status(200).json({
      success: "Profit Balance Added Successfully!",
    });
  }

  if (type == "transaction_fee") {
    await User.updateOne({ _id: id }, { $set: { transaction_fee: value } });
    return res.status(200).json({
      success: "transaction_fee Edited Successfully!",
    });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  if (User.countDocuments < 1) {
    return res.status(404).json({
      message: "No User Found",
    });
  }

  return res.json(users);
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: "email is required",
      });
    }

    //Check if password is goood
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast six(6) characters",
      });
    }

    //Check if user exist
    const user = await Admin.findOne({ email });
    const adminCount = await Admin.countDocuments();
    if (!user && adminCount < 1) {
      const hashedPassword = await hashPassword(password);
      await Admin.create({
        name: "Admin",
        email: "example@gmail.com",
        password: hashedPassword,
        req_date: new Date(),
      });
      return res.json({
        new: "New admin created Contact lordy-popdy for Details!",
      });
    }
    //Check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { name: user.name, email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      return res.json({
        error:
          "password not match our database, password should be atleast six(6) character",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    //Check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { name: user.name, email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      return res.json({
        error:
          "password not match our database, password should be atleast six(6) character",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const test = async (req, res) => {
  return res.status(200).json({ message: "Connected Succesfully!" });
};

const createUser = async (req, res) => {
  const {
    name,
    email,
    country,
    currency,
    account,
    password,
    comfirm_password,
  } = req.body;
  try {
    //Check if name was taken
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //check if email is provided
    if (!email) {
      return res.json({
        error: "email is required!",
      });
    }

    //check if country is provided
    if (!country) {
      return res.json({
        error: "country is required!",
      });
    }

    //check if currency is provided
    if (!currency) {
      return res.json({
        error: "currency is required!",
      });
    }

    //check if country is provided
    if (!account) {
      return res.json({
        error: "account is required!",
      });
    }

    //Check if password is goood
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast six(6) characters",
      });
    }

    //Check comfirmPassword
    if (password !== comfirm_password) {
      return res.json({
        error: "Comfirm password must match password",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is taken",
      });
    }

    // const adminTotalUserUpdate = await Admin.updateOne(
    //   { adminEmail: "bitclubcontract@gmail.com" },
    //   { $inc: { totalUser: 1 } }
    // );

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name: name,
      email: email,
      country: country,
      currency: currency,
      account: account,
      password: hashedPassword,
      req_date: new Date(),
    });

    console.log(user);
    if (user) {
      return res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  test,
  Delete,
  getOTP,
  Decline,
  Approve,
  chatSend,
  getUser,
  fetchKyc,
  citizenId,
  userInfo,
  getUsers,
  DeleteKyc,
  ApproveKyc,
  loginUser,
  fetchOTP,
  verifyOtp,
  DeclineKyc,
  createUser,
  deleteChat,
  getMessage,
  loginAdmin,
  fetchAllKyc,
  addBalance,
  withdrawBank,
  getAdminChat,
  ressetPassword,
  getAccountLevel,
  withdrawCrypto,
  AdminGetCrypto,
  AdminGetBankR,
  upgradeAccount,
  getBankRecords,
  getNotification,
  getCryptoRecords,
  notificationAdder,
  userNotification,
  uploadProfilePic,
  updatePersonalDetails,
  updateAddressInfo,
};
