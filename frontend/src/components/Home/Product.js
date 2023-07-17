import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.9)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
  };

  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>({product.numOfReviews})</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
      <p>Created At: {new Date(product.createdAt.$date).toLocaleString()}</p>
    </Link>
  );
};

export default Product;
