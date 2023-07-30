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

// Get All Product
// Get All Product
exports.getAllProducts = async (req, res, next) => {
  const { keyword, page, priceGte, priceLte, category, ratings } = req.query;

  const resultPerPage = 8;
  const currentPage = parseInt(page) || 1;

  const priceQuery = {};
  if (priceGte) {
    priceQuery.$gte = parseInt(priceGte);
  }
  if (priceLte) {
    priceQuery.$lte = parseInt(priceLte);
  }

  const query = {
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ],
  };

  if (category && category !== "All") {
    query.category = category;
  }

  if (Object.keys(priceQuery).length !== 0) {
    query.price = priceQuery;
  }

  if (ratings) {
    // Extract the ratings value from the object and convert it to a number
    const minRating = parseFloat(ratings.gte);
    // Use the $gte operator to filter products with ratings greater than or equal to minRating
    query.ratings = { $gte: minRating };
  }

  try {
    const productCount = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((currentPage - 1) * resultPerPage)
      .limit(resultPerPage);

    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

// Get product detail
exports.getProductDetail = catchAsyncError(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    product,
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

//create product rating and reviews
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(rating);
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avgRating = 0;
  product.reviews.forEach((rev) => {
    avgRating += rev.rating;
  });
  product.ratings = avgRating / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//  get all reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//  delete Reviews
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avgRating = 0;

  reviews.forEach((rev) => {
    avgRating += rev.rating;
  });

  const ratings = avgRating / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
