/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Cart from "../models/Cart";
import { Request, Response } from "express";
import { handleError } from "./common/error";

export const addItemToCart = async (req: Request, res: Response) => {
  const { user, restaurant, name, quantity, price } = req.body ?? {};

  try {
    let cart = await Cart.findOne({ user });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ user, items: [], totalAmount: 0 });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.name === name && item.restaurant.toString() === restaurant
    );

    if (existingItemIndex > -1) {
      const existingQuantity = cart.items[existingItemIndex].quantity;
      cart.items[existingItemIndex].quantity =
        existingQuantity + (quantity as number);
    } else {
      // Add new item to the cart
      cart.items.push({ restaurant, name, quantity, price });
    }

    // Calculate the total amount
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  const { user } = req.params;

  try {
    const cart = await Cart.findOne({ user }).populate("items.restaurant");
    res.status(200).json(cart ?? { items: [] });
  } catch (error) {
    handleError(res, error);
  }
};

export const removeItemFromCart = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user, itemName, restaurantId } = req.params;

  try {
    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to remove
    cart.items = cart.items.filter(
      (item) =>
        !(item.name === itemName && item.restaurant.toString() === restaurantId)
    );

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateItemQuantity = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user, itemName, restaurantId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) =>
        item.name === itemName && item.restaurant.toString() === restaurantId
    );

    if (item) {
      item.quantity = quantity;
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    console.log(cart);

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    handleError(res, error);
  }
};

export const clearCart = async (req: Request, res: Response): Promise<any> => {
  const { user } = req.params;
  try {
    await Cart.deleteOne({ user });
    res.status(200).json({ message: "Done cart cleared !" });
  } catch (error) {
    handleError(res, error);
  }
};
