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

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import Store from "./Store";
import axios from "axios";

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
