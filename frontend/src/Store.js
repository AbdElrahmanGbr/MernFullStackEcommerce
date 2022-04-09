import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/ProductReducer";
import {authReducer} from "./reducers/userReducer";
import { newOrderReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  // user: userReducer,
  // cart: cartReducer,
  newOrder: newOrderReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
