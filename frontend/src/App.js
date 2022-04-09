import { useEffect, useState } from "react";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from "./components/product/ProductDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";

import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import { loadUser } from "./actions/userActions";
import Store from "./Store";
import axios from "axios";

//payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    Store.dispatch(loadUser())
    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }
    getStripApiKey();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes className="container container-fluid">
        <Route path="/" element={<Home />} exact />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} exact />
        <Route path="/cart" element={<Cart />} />


        <Route
          path="/shipping"
          element={
            <ProtectedRoute >
              <Shipping />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute >
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute >
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        {/* {stripeApiKey && (
          <Route stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" element={payment} />
          </Route>
        )} */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />
        <Route path="/me" element={<Profile />} />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute >
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute >
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        {/* {stripeApiKey &&
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route path="/payment" element={<ProtectedRoute ><Payment /></ProtectedRoute>} />
          </Elements>
        } */}

      </Routes>
      <Footer />
    </div>
  );
}

export default App;


const ProtectedRoute = ({ user, children }) => {
  // const location = useLocation();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children
};