const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
const errorMiddleware = require("./middleware/Error");
//route import
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/orderRoute.js");
///
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
//middleware for error
app.use(errorMiddleware);

module.exports = app;
