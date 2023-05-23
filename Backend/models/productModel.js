const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please add A Product Name"],
    trim: true,
  },
  description: {
    type: String,
    require: [true, "Please add A description"],
  },
  price: {
    type: Number,
    require: [true, "Please add A description"],
    maxLength: [8, "Price cannot exceed 8 Character"],
  },
  ratings: {
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
  Stock: {
    type: Number,
    require: [true, "Please Enter Product Stock"],
    maxLength: [4, "Stock Can not Exceed 4 character"],
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

module.exports = mongoose.model("Product", productSchema);
