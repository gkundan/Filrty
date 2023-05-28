const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} = require("../controllers/ProductController");
//check auth
const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

//get all products
// Root route
router
  .route("/products")
  .get(isAuthenticateUser, authorizeRole, getAllProducts);

//create product
router.route("/product/new").post(isAuthenticateUser, createProduct);

//update,delete & detail product route
router
  .route("/product/:id")
  .put(isAuthenticateUser, updateProduct)
  .delete(isAuthenticateUser, deleteProduct)
  .get(getProductDetail);

//export
module.exports = router;
