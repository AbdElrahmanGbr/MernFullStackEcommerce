import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import Store from "./Store";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes className="container container-fluid">
        <Route path="/" element={<Home />} exact />
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} exact />
        <Route path="/cart" element={Cart} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<NewPassword />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path="/update-profile"
          element={<ProtectedRoute component={<UpdateProfile />} />}
        />
        <Route
          path="/update-password"
          element={<ProtectedRoute component={<UpdatePassword />} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
