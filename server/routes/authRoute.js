import express from "express";
import cors from "cors";
import multer from "multer";

import {
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
  sendMessage,
  getMessages,
  deleteMessage,
  adminReply,
  deleteUser,
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
  getUserVerification,
  updatePersonalDetails,
  updateAddressInfo,
} from "../controllers/authController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Allow multiple origins
const allowedOrigins = [
  "https://kapital-fluss.vercel.app",
  "https://kapital-kyc.vercel.app",
  "https://kapital-fluss-admin.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: " + origin));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

router.use(cors(corsOptions));

router.options("*", cors(corsOptions));

/* ----------------- Routes ----------------- */
router.get("/test", test);
router.post("/Delete", Delete);
router.post("/Approve", Approve);
router.post("/Decline", Decline);
router.post("/getUser", getUser);
router.post("/getOTP", getOTP);
router.get("/getUsers", getUsers);
router.post("/login", loginUser);
router.post("/chatSend", chatSend);
router.post("/citizenId", citizenId);
router.post("/approveKyc", ApproveKyc);
router.post("/deleteKyc", DeleteKyc);
router.post("/declineKyc", DeclineKyc);
router.post("/userInfo", userInfo);
router.post("/fetchOTP", fetchOTP);
router.post("/fetchKyc", fetchKyc);
router.post("/send", sendMessage);
router.post("/deleteUser", deleteUser);
router.get("/chat/:userId", getMessages);
router.delete("/delete/:id", deleteMessage);
router.post("/admin-reply", adminReply);
router.post("/verifyOtp", verifyOtp);
router.get("/fetchAllKyc", fetchAllKyc);
router.post("/register", createUser);
router.post("/adminAuth", loginAdmin);
router.post("/addBalance", addBalance);
router.post("/deleteChat", deleteChat);
router.post("/getMessage", getMessage);
router.post("/getAdminChat", getAdminChat);
router.post("/withdrawBank", withdrawBank);
router.post("/AdminGetBankR", AdminGetBankR);
router.post("/upgradeAccount", upgradeAccount);
router.post("/AdminGetCrypto", AdminGetCrypto);
router.post("/withdrawCrypto", withdrawCrypto);
router.post("/getBankRecords", getBankRecords);
router.post("/userMessage", notificationAdder);
router.post("/ressetPassword", ressetPassword);
router.post("/getAccountLevel", getAccountLevel);
router.post("/getNotification", getNotification);
router.post("/userNotification", userNotification);
router.post("/getCryptoRecords", getCryptoRecords);
router.post("/updateAddressInfo", updateAddressInfo);
router.post("/getUserVerification", getUserVerification);
router.post("/updatePersonalDetails", updatePersonalDetails);
router.post(
  "/uploadProfilePic",
  upload.single("profile_pic"),
  uploadProfilePic
);

export default router;
