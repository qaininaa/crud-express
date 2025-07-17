import express from "express";
import * as productController from "../controllers/product.controller.js";
import { authRolesMidlleware } from "../middlewares/authRoles.middleware.js";

const router = express.Router();

router.get(
  "/",
  authRolesMidlleware("ADMIN"),
  productController.getAllProductsController
);
router.get("/:id", productController.getProductByIdController);
router.post("/", productController.createProductController);
router.put("/:id", productController.updatePutProductController);

export default router;
