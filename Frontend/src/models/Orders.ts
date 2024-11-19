import { Type } from "typescript";

export interface OrdersType {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export interface OrderItem {
  restaurant: string;
  name: string;
  quantity: number;
  price: number;
  _id: string;
}

type ItemsType = Omit<OrderItem, "_id">;

export interface CreateOrderPayload {
  user: string;
  items: ItemsType[];
}
