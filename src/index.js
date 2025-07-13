import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("you are listening on port", PORT));
