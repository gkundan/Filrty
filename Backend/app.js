const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/Error");
//route import
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
///
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api/v1", product);
app.use("/api/v1/", user);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
