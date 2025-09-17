const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const verifyToken = require("../middleware/auth.middleware"); // <- phải khớp tên file

router.post("/", verifyToken, customerController.createCustomer);
router.get("/", verifyToken, customerController.getAllCustomers);

module.exports = router;
