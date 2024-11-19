const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productUnit: { type: String, required: true },
    productDescription: { type: String, required: true },
    productImage: { type: String, required: true },
    productType: { type: String, required: true },
  },
  { timestamps: true }
);

const schemaName = "product";
module.exports = mongoose.model(schemaName, productSchema);
