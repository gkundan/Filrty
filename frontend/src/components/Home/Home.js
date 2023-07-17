import React, { Fragment, useEffect, useState } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layouts/MetaData";
import TextTransition, { presets } from "react-text-transition";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";

// Text animation
const TEXTS = ["Tshirt", "Sunglasses", "Computer", "Phones", "Bags"];

const Home = () => {
  // Text animation
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000); // Every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  // Product listing
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // Sort the products based on their name
  const sortedProducts = (products || []).slice().sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return (
    <Fragment>
      <MetaData title="Flirty .." />
      <div className="banner">
        <p>Welcome To Flirty.</p>
        <h1 className="text-animate">
          <span>We Deliver Amazing Products</span>
        </h1>
        <h1>
          <TextTransition springConfig={presets.wobbly}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </h1>
        <a href="#container">
          <button>
            Scroll <FaMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Feature Products</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="container" id="container">
          {sortedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
