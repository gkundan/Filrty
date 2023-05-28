const mongoose = require("mongoose");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature");

// Create product - admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  // for page 1 products
  const resultPerPage = 5;

  // Count documents
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  // console.log("api query log", apiFeature.query); // Log the modified query

  const products = await apiFeature.query;

  // console.log("products log", products); // Log the products array

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// Get product detail
exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

// Update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  let product = await Product.findById(productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});
