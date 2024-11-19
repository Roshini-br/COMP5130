const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
/* @swagger
 */
router.post("/create", authenticationMiddleware, orderController.createOrder);
router.get("/", authenticationMiddleware, orderController.getAllOrders);

module.exports = router;
