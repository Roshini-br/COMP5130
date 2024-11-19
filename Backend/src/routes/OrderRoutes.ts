/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from "express";
import OrderModel from "../models/Order";
import { handleError } from "./common/error";

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, items } = req.body;

    // Create a new order document
    const order = new OrderModel({
      user,
      items,
      totalAmount: items.reduce(
        (acc: number, item: any) =>
          acc + (item.quantity as number) * (item.price as number),
        0
      ),
    });

    // Save the order to the database
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all orders for user
export const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.params;
    const orders = await OrderModel.find({ user }); //.populate("items.restaurant");
    res.status(200).json(orders);
  } catch (error) {
    handleError(res, error);
  }
};

// Get order by ID
export const getOrderById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id); //.populate("items.restaurant");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    handleError(res, error);
  }
};

// Update order status
export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { orderStatus, paymentStatus },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    handleError(res, error);
  }
};
