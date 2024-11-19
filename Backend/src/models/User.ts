import mongoose, { Document, Schema } from "mongoose";

// Define the User interface extending Document
interface User extends Document {
  username: string; // Username
  email: string; // Unique email
  password: string; // User's password
  createdAt: Date; // Account creation timestamp
  address: string; // User's delivery address
  phoneNumber?: string; // Optional phone number
}

// Create the User schema
const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  address: { type: String, required: true },
  phoneNumber: { type: String }, // Optional
});

// Create the User model
const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
