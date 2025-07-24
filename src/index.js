import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const allowedOrigins = process.env.ORIGIN.split(",") || [];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const currentTime = new Date().toLocaleString();
  const serverUptime = process.uptime().toFixed(2) + " seconds";

  res.json({
    message: "Welcome to Karinina API",
    version: "1.0.0",
    serverTime: currentTime,
    serverUptime: serverUptime,
    environment: process.env.NODE_ENV || "development",
    status: "operational",
  });
});

app.use("/users", userRouter);

app.use("/products", authMiddleware, productRouter);

app.listen(PORT, () => console.log("you are listening on port", PORT));
