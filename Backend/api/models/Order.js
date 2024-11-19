const mongoose = require("mongoose");

// Create the Order schema
const orderSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  orderStatus: { type: String, default: "Order Placed", required: true },
  totalAmount: { type: Number, default: 0 },
  deliveryType: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const schemaName = "order";
module.exports = mongoose.model(schemaName, orderSchema);