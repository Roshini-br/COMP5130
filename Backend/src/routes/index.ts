import { Router } from "express";
import Paths from "../common/Paths";
import { getAllRestaurants, getRestaurantById } from "./RestaurantRoutes";
import {
  addItemToCart,
  clearCart,
  getCartItems,
  removeItemFromCart,
  updateItemQuantity,
} from "./CartRoutes";

import {
  createOrder,
  updateOrderStatus,
  getAllOrdersForUser,
  getOrderById,
} from "./OrderRoutes";

import { createUser, getUserById, loginUser, updateUser } from "./UserRoutes";
import { makePayment } from "./PaymentRoutes";
import authMiddleware from "@src/middleware/authMiddleware";

// **** Variables **** //

function secureRoute(router: Router) {
  router.use(authMiddleware);
}

const apiRouter = Router();

// ** Initialize restaurantRouter ** //
const restaurantRouter = Router();
secureRoute(restaurantRouter);
restaurantRouter.get(Paths.Restaurant.Get, getAllRestaurants);
restaurantRouter.get(Paths.Restaurant.GetById, getRestaurantById);

apiRouter.use(Paths.Restaurant.Base, restaurantRouter);

// ** Initialize cartRouter ** //
const cartRouter = Router();
secureRoute(cartRouter);
cartRouter.post(Paths.Cart.Add, addItemToCart);
cartRouter.get(Paths.Cart.Get, getCartItems);
cartRouter.delete(Paths.Cart.Remove, removeItemFromCart);
cartRouter.patch(Paths.Cart.Update, updateItemQuantity);
cartRouter.delete(Paths.Cart.Clear, clearCart);

apiRouter.use(Paths.Cart.Base, cartRouter);

const orderRouter = Router();
secureRoute(orderRouter);
orderRouter.get(Paths.Orders.GetById, getOrderById);
orderRouter.get(Paths.Orders.GetByUserId, getAllOrdersForUser);
orderRouter.post(Paths.Orders.Create, createOrder);
orderRouter.patch(Paths.Orders.UpdateStatus, updateOrderStatus);

apiRouter.use(Paths.Orders.Base, orderRouter);

const paymentRouter = Router();
secureRoute(paymentRouter);
paymentRouter.post(Paths.Payment.Create, makePayment);

apiRouter.use(Paths.Payment.Base, paymentRouter);

// **** Variables **** //
const userRouter = Router();

// ** User Routes ** //
userRouter.post(Paths.Users.Create, createUser);
userRouter.post(Paths.Users.Login, loginUser);
userRouter.get(Paths.Users.GetById, authMiddleware, getUserById);
userRouter.patch(Paths.Users.Update, authMiddleware, updateUser);

apiRouter.use(Paths.Users.Base, userRouter);


// **** Export default **** //

export default apiRouter;
