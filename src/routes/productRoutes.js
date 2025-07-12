import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updatePutProductController,
} from "../controllers/product.Controller.js";

const router = express.Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.post("/", createProductController);
router.put("/:id", updatePutProductController);

export default router;
