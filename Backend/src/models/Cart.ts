import mongoose, { Document, Schema } from "mongoose";

export interface Cart extends Document {
  user: mongoose.Types.ObjectId; // Reference to the User model
  items: {
    restaurant: mongoose.Types.ObjectId; // Reference to the Restaurant model
    name: string; // Name of the menu item
    quantity: number; // Quantity of the item
    price: number; // Price of the item
  }[];
  totalAmount: number; // Total amount for the cart
  createdAt: Date; // Timestamp when the cart was created
}

// Create the Cart schema
const cartSchema = new Schema<Cart>({
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
  totalAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Create the Cart model
const CartModel = mongoose.model<Cart>("Cart", cartSchema);

export default CartModel;
