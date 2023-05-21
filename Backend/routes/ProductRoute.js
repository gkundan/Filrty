const express = require("express");
const { getAllProducts } = require("../controllers/ProductController");

const router = express.Router();

//root route
router.route("/products").get(getAllProducts);

module.exports = router;
