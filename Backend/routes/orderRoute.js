const express = require("express");
const router = express.Router();

const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

//create new order
router.route("/order/new").post(isAuthenticateUser, newOrder);

//get single order detail
router.route("/order/:id").get(isAuthenticateUser, getSingleOrder);

//get user all order
router.route("/orders/me").get(isAuthenticateUser, myOrders);

//get all order --Admin
router
  .route("/admin/orders")
  .get(isAuthenticateUser, authorizeRole("admin"), getAllOrders);

//order update
router
  .route("/admin/order/:id")
  .put(isAuthenticateUser, authorizeRole("admin"), updateOrder)
  .delete(isAuthenticateUser, authorizeRole("admin"), deleteOrder);

//

module.exports = router;
