const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
/* @swagger
 */
router.get("/all", productController.getProducts);

module.exports = router;
