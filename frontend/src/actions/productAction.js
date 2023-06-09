import axios from "axios";
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERROR } from "../constants/productContants"

export const getProduct =() => async (dispatch) =>{
    try {
        
        dispatch({type:ALL_PRODUCT_REQUEST});

        const {data} = await axios.get('http://localhost:4000/api/v1/products');

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
};

/// clearing error
export const clearError =()=> async(dispatch)=>{

    dispatch({
        type:CLEAR_ERROR,

    })
}