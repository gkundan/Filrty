import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import "./ProductDetail.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.9)",
    activeColor: "tomato",
    emptyIcon: "tomato", // Set emptyIcon to the same color as activeColor
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: false,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} ...`} />
          <div className="ProductDetail">
            <div className="CarouselContainer">
              <Carousel animation="slide">
                {product?.images?.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i + 1} Slide`}
                  />
                ))}
              </Carousel>
            </div>

            <div className="detailsContainer">
              <div className="detailsBlock1">
                <h2>{product?.name}</h2>
                <p>Product# {product?._id}</p>
              </div>
              <div className="detailsBlock2">
                <ReactStars {...options} />
                <span>({product?.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock3">
                <h1>₹ {product?.price}</h1>
                <div className="detailsBlock3-1">
                  <div className="detailsBlock3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                    <button>Add to Cart</button>
                  </div>
                </div>
                <p>
                  Status:
                  <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                    {product?.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock4">
                Description:
                <p>{product?.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewHeading">Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReview">No Review yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetail;
