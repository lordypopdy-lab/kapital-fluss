// index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected successfully!'))
  .catch((error) => console.log('Database not connected', error));

// Allow CORS globally
const allowedOrigins = [
  "https://kapital-kyc.vercel.app",
  "https://kapital-fluss.vercel.app",
  "https://kapital-fluss-admin.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow non-browser clients
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: " + origin));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Parse JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", authRoute);

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Kapital-Fluss is Running at Port: ${PORT}`);
});
