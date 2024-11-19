import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import Profile from "./components/profile/Profile";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Header from "./shared/header/Header";
import Footer from "./shared/footer/Footer";
import NotFound from "./shared/notfound/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const isDefinedRoute = [
    "/",
    "/shop",
    "/profile",
    "/cart",
    "/orders",
  ].includes(location.pathname);

  return (
    <div className="App">
      {isDefinedRoute && <Header />}
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
      {isDefinedRoute && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
