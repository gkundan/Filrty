const express = require("express");

const app = express();

//route import
const product = require("./routes/ProductRoute");

///

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", product);

module.exports = app;
