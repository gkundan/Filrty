const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to create the order", 500));
  }
});

// Get single order detail
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id }).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order Not Found on this Id", 400));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged user order detail
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders (Admin)
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// Update order status (Admin)
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This order has already been delivered", 400));
  }

  for (const orderItem of order.orderItems) {
    const product = await Product.findById(orderItem.product);

    const remainingStock = product.stock - orderItem.quantity;
    product.stock = remainingStock >= 0 ? remainingStock : 0;

    await product.save({ validateBeforeSave: false });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
  });
});

// Delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndRemove(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
  });
});
