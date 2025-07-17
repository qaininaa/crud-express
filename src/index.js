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

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(urlencoded({ extended: false }));

app.use("/users", userRouter);

app.use("/products", authMiddleware, productRouter);

app.listen(PORT, () => console.log("you are listening on port", PORT));
