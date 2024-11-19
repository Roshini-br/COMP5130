const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
/* @swagger
 */
router.post(
  "/addProduct",
  authenticationMiddleware,
  cartController.addItemToCart
);
router.post(
  "/removeProduct",
  authenticationMiddleware,
  cartController.removeItemFromCart
);
router.put("/clear", authenticationMiddleware, cartController.clearCart);
router.get("/", authenticationMiddleware, cartController.getCartItems);

module.exports = router;
