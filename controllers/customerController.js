const Customer = require("../models/Customer");

exports.createCustomer = async (req, res, next) => {
  try {
    const { phone, name, model } = req.body;
    const customer = await Customer.create({ phone, name, model });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    next(err);
  }
};
