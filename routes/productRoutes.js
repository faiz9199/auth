const express = require("express");
const routes = express.Router();
const { ensureAuthenticated } = require("../utils/auth");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteById,
} = require("../controllers/productControllers");

routes.post("/", ensureAuthenticated, createProduct);
routes.get("/", getProducts);
routes.get("/:id", getProductById);
routes.put("/:id", ensureAuthenticated, updateProductById);
routes.delete("/:id", ensureAuthenticated, deleteById);

module.exports = routes;