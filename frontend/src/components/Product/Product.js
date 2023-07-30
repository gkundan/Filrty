import React, { useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layouts/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MetaData from "../layouts/MetaData";

//category
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Electronic",
  "Watch",
  "Phone",
  "Bags",
  "Shoes",
  "Cosmetics",
];

function Product() {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  const [price, setprice] = useState([0, 130000]);
  const [ratings, setRatings] = useState(0);

  const { loading, products, resultPerPage, productCount } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setprice(newPrice);
  };

  // Function to handle category click
  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products--- Flirty" />
          <h2 className="productHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={130000}
            />
            <Typography>Category</Typography>
            <div className="categoryBox">
              {categories.map((cat) => (
                <div
                  className={`category-li ${category === cat ? "active" : ""}`}
                  key={cat}
                  onClick={() => {
                    handleCategoryClick(cat);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>

            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Product;
