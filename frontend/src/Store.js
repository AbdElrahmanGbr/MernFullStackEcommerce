import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from './reducers/cartReducers'
import { productsReducer,productDetailsReducer  } from "./reducers/ProductReducer"
import {authReducer, userReducer } from "./reducers/userReducer"
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer
})
// let initialState = {
//     cart: {
//         cartItems: localStorage.getItem('cartItems')
//             ? JSON.parse(localStorage.getItem('cartItems'))
//             : [],
//         shippingInfo: localStorage.getItem('shippingInfo')
//             ? JSON.parse(localStorage.getItem('shippingInfo'))
//             : {}
//     }
// }
const middleware = [thunk]
const Store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))
export default Store

