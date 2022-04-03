const express = require("express");
const router = express.Router();
const { newOrder } = require("../controllers/productController");
const {isAuthenticatedUser, isAuthenticatedUser} = require("../middlewares/auth");
router.route('/order/new').post(isAuthenticatedUser, newOrder);
module.exports = router;

