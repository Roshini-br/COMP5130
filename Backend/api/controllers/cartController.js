const Cart = require("../models/Cart");

exports.addItemToCart = async (req, res) => {
  const { user, product, quantity } = req.body ?? {};

  try {
    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({
        user,
        products: [],
        totalAmount: 0,
        createdAt: Date.now(),
      });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === product
    );

    if (existingProductIndex > -1) {
      const existingQuantity = cart.products[existingProductIndex].quantity;
      cart.products[existingProductIndex].quantity =
        existingQuantity + quantity;
    } else {
      // Add new item to the cart
      cart.products.push({ product });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to save to cart" });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { user, product } = req.body ?? {};

  try {
    const cart = await Cart.findOne({ user }).populate("products.product");

    if (cart?.products?.length) {
      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== product
      );
    }
    await cart.save();

    res.status(200).json(cart ?? { products: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to delete product" });
  }
};

exports.clearCart = async (req, res) => {
  const { user } = req.body ?? {};

  try {
    const cart = await Cart.findOne({ user });

    if (cart?.products?.length) {
      cart.products = [];
    }
    await cart.save();

    res.status(200).json(cart ?? { products: [] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to clear cart" });
  }
};

exports.getCartItems = async (req, res) => {
  const user = req.query.user_id;
  try {
    const cart = await Cart.findOne({ user }).populate("products.product");

    if (cart?.products?.length) {
      const totalAmount = cart.products.reduce(
        (acc, item) => acc + item.product.productPrice * item.quantity,
        0
      );

      cart.totalAmount = totalAmount;
    }

    res.status(200).json({ status: 1, cartData: cart });
  } catch (error) {
    console.log(error);
    res.status(200).json({ status: 0, message: "Unable to get cart" });
  }
};
