import axios from "axios";
import {
    
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/ProductConstant"
export const getProducts = (keyword= '' ,  currentPage = 1, price ,category, rating = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })
       console.log({category});
       

        const { data } = await axios.get( '/api/v1/products',{
            params: {
                keyword: keyword,
                page: currentPage,
                price: price,
                category: category,
                rating: rating
            
        }})
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.date.message
           
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        
        const { data } = await axios.get(`/api/v1/product/${id}`)
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}