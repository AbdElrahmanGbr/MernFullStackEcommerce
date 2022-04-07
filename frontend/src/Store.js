import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productsReducer,productDetailsReducer  } from "./reducers/ProductReducer"
import {authReducer, userReducer } from "./reducers/userReducer"
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer
})
let initialState = {}
const middleware = [thunk]
const Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default Store