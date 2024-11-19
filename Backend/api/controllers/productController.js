const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json({ status: 1, productData: data });
  } catch (error) {
    res.status(500).json({ message: "No products available at the moment." });
  }
};
