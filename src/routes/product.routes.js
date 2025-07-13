import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updatePutProductController,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllProductsController);
router.get("/:id", getProductByIdController);
router.post("/", createProductController);
router.put("/:id", updatePutProductController);

export default router;
