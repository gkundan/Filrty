import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  CLEAR_ERROR,
} from "../constants/productConstants";

//get products
export const getProduct =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 130000],
    category = "",
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      // Update the query parameter names to match the backend
      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&priceGte=${price[0]}&priceLte=${price[1]}`;

      // Add category and ratings parameters
      if (category) {
        link += `&category=${category}`;
      }
      if (ratings > 0) {
        link += `&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get product detail
export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};
/// clearing error
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
