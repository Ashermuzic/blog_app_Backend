import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8800;

const app = express();

app.use(express.json());
app.use(cookieParser());

// Define CORS options
const corsOptions = {
  origin: "https://localhost:3000", // Replace with the actual frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, headers) to be included in the request
  optionsSuccessStatus: 204, // Set the status code for successful preflight requests
};

// Use the cors middleware with the defined options
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
  console.log(`Listening on port ${port}`);
});
