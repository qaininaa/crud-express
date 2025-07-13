import express from "express";
import {
  createUserController,
  LoginUserController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/auth", LoginUserController);

export default router;
