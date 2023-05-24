const mongoose = require("mongoose");

//product schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    require: [true, "Please Enter Description"],
  },
  price: {
    type: Number,
    require: [true, "Please Enter Price"],
    maxLength: [8, "Price can not exceed"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    require: [true, "Please Enter Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 char"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//
module.exports = mongoose.model("Product", productSchema);
