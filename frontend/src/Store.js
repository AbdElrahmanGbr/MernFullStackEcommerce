import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer
} from "./reducers/ProductReducer";

import { newOrderReducer , myOrderReducer , orderDetailsReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  // auth: authReducer,
  // user: userReducer,
  // cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer
});
// let initialState = {
//   cart: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//     shippingInfo: localStorage.getItem("shippingInfo")
//       ? JSON.parse(localStorage.getItem("shippingInfo"))
//       : {},
//   },
// }; //initialState in the begin cart and shippingInfo is empty
const middleware = [thunk];
const store = createStore(
  reducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;