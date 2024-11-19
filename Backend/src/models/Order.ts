import mongoose, { Document, Schema } from "mongoose";

// Define the Order interface extending Document
interface Order extends Document {
  user: mongoose.Types.ObjectId; // Reference to the User model
  items: {
    restaurant: mongoose.Types.ObjectId;
    name: string; // Menu item name
    quantity: number; // Quantity of the item
    price: number; // Price of the item
  }[]; // Ordered items array
  totalAmount: number; // Total amount for the order
  paymentStatus: string; // Payment status (e.g., Pending, Completed)
  orderStatus: string; // Order status (e.g., Processing, Delivered)
  createdAt: Date; // Timestamp when the order was created
}

// Create the Order schema
const orderSchema = new Schema<Order>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: "Pending" },
  orderStatus: { type: String, default: "Processing" },
  createdAt: { type: Date, default: Date.now },
});

// Create the Order model
const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
