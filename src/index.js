import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("you are listening on port", PORT));
