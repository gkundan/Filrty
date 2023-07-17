const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getProductReviews,
  deleteReviews,
} = require("../controllers/ProductController");
const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

// Root route
router.route("/products").get(getAllProducts);

// Create product route (admin)
router
  .route("/admin/product/new")
  .post(isAuthenticateUser, authorizeRole("admin"), createProduct);

// Update, delete, and detail product routes (admin)
router
  .route("/admin/product/:id")
  .put(isAuthenticateUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticateUser, authorizeRole("admin"), deleteProduct);

// Get product detail route
router.route("/product/:id").get(getProductDetail);

//updating the rating or reviews
router.route("/review").put(isAuthenticateUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticateUser, deleteReviews);

// Export the router
module.exports = router;
