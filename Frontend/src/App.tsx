import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";

// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
// import Checkout from './pages/Checkout';

import Home from "./components/Home";

import AppContext from "./components/context/AppContext";
import { getAllRestaurants } from "./services/restaurant.service";
import { Restaurant } from "./models/Restaurant";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import AuthForm from "./components/AuthForm";
import { useDisclosure } from "@mantine/hooks";
function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [shouldForceRerouteToHome, handleShouldForceRerouteToHome] =
    useDisclosure(false);

  //UserInfoDrawer
  const [shouldShowDrawer, { open: showDrawer, close: hideDrawer }] =
    useDisclosure(false);

  async function fetchAllRestaurants() {
    try {
      const res = await getAllRestaurants();
      console.log(res.data);
      if (res?.data) {
        setRestaurants(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchAllRestaurants();
  }, [userId]);

  return (
    <AppContext.Provider
      value={{
        restaurants,
        setRestaurants,
        userId,
        setUserId,
        shouldForceRerouteToHome,
        toggleShouldForceRerouteToHome: handleShouldForceRerouteToHome.toggle,
        shouldShowDrawer,
        showDrawer,
        hideDrawer,
      }}
    >
      <AuthForm />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":restaurantId" element={<Menu />} />
          <Route path="cart/:userId" element={<Cart />} />
          <Route path="orders/:userId" element={<Orders />} />
          {/* <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
