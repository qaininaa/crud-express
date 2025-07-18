import express from "express";
import {
  createUserController,
  loginUserController,
  refreshController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.get("/refresh", refreshController);

export default router;
