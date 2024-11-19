const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const {
    user,
    products,
    orderStatus,
    totalAmount,
    deliveryType,
    deliveryAddress,
  } = req.body ?? {};
  try {
    const order = new Order({
      user,
      products,
      orderStatus,
      totalAmount,
      deliveryAddress,
      deliveryType,
    });

    await order.save();
    res.status(200).json({ status: 1, order });
  } catch (error) {
    console.log(error);
    res.status(200).json({ status: 0, message: "Unable to create Order" });
  }
};

exports.getAllOrders = async (req, res) => {
  const user = req.query.user_id ?? "";
  try {
    const order = await Order.find({ user }).populate("products.product");
    res.status(200).json({ status: 1, order });
  } catch (error) {
    console.log(error);
    res.status(200).json({ status: 0, message: "Unable to get all Order" });
  }
};
