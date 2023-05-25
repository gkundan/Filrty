const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/Error");
//route import
const product = require("./routes/ProductRoute");

///
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", product);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
