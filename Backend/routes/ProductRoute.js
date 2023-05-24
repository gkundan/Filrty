const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} = require("../controllers/ProductController");

const router = express.Router();

//root route
router.route("/products").get(getAllProducts);

//create product
router.route("/product/new").post(createProduct);

//update,delete & detail product route
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetail);

//export
module.exports = router;
