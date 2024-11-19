const mongoose = require("mongoose");
// Create the Cart schema
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: false,
      },
      quantity: { type: Number, required: false, default: 1 },
    },
  ],
  totalAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const schemaName = "cart";
// Create the Cart model
module.exports = mongoose.model(schemaName, cartSchema);
