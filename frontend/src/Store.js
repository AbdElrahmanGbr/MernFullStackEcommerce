import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/ProductReducer";
import { authReducer, userReducer } from "./reducers/userReducer";
// import { cartReducer } from "./reducers/cartReducer";
import { newOrderReducer } from "./reducers/orderReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    // shippingInfo: localStorage.getItem("shippingInfo")
    //   ? JSON.parse(localStorage.getItem("shippingInfo"))
    //   : {},
  },
}; //initialState in the begin cart and shippingInfo is empty
const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
