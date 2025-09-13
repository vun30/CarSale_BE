var express = require("express");
var router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/", customerController.createCustomer);
router.get("/", customerController.getAllCustomers);

module.exports = router;
