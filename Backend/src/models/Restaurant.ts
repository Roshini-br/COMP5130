import mongoose, { Document, Schema } from "mongoose";

// Define the Restaurant interface extending Document
interface Restaurant extends Document {
  name: string; // Name of the restaurant
  address: string; // Address of the restaurant
  cuisine: string; // Type of cuisine
  rating?: number; // Optional average rating
  image: string;
  menu: {
    name: string; // Menu item name
    description?: string; // Optional description
    price: number; // Price of the item
  }[]; // Menu items array
}

// Create the Restaurant schema
const restaurantSchema = new Schema<Restaurant>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 0 }, // Optional
  image: { type: String, required: true }, // Optional
  menu: [
    {
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
});

// Create the Restaurant model
const RestaurantModel = mongoose.model<Restaurant>(
  "Restaurant",
  restaurantSchema
);

export default RestaurantModel;
