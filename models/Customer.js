const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
