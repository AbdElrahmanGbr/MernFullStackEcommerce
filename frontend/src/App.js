import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from "./components/product/ProductDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import Store from "./Store";
import axios from "axios";

//payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    Store.dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);

      // console.log(data.stripeApiKey);
      getStripeApiKey();
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes className="container container-fluid">
        <Route path="/" element={<Home />} exact />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} exact />

        <Route path="/cart" element={Cart} exact />
        <ProtectedRoute path="/shipping" element={Shipping} exact />
        <ProtectedRoute path="/order/confirm" element={ConfirmOrder} exact />
        <ProtectedRoute path="/success" element={OrderSuccess} exact />
       {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/payment" element={Payment} />
          </Elements>
        )} 

        <ProtectedRoute path="/orders/me" element={ListOrders} exact />  
        <ProtectedRoute path="/order/:id" element={OrderDetails} exact />  

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/me" element={<ProtectedRoute />}>
          <Route excat path="/me/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
