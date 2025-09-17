// controllers/customerController.js
const Customer = require("../models/Customer");
const { sendLeadEmail } = require("../config/mailer");

exports.createCustomer = async (req, res, next) => {
  try {
    let { phone, name, model, source } = req.body;

    // validate nhẹ
    if (!name || !phone || !model) {
      return res.status(400).json({ ok: false, error: "MISSING_FIELDS" });
    }
    phone = String(phone).replace(/\D+/g, ""); // chuẩn hoá số liền

    const customer = await Customer.create({
      phone,
      name: name.trim(),
      model: model.trim(),
      source: source?.trim() || "contact-modal",
    });

    // gửi email không chặn response
    sendLeadEmail({
      name: customer.name,
      phone: customer.phone,
      model: customer.model,
      source: customer.source,
    })
      .then((info) =>
        console.log("📧 Email sent:", info.messageId || "(no id)")
      )
      .catch((err) => console.error("📧 Email error:", err.message));

    res.status(201).json({ ok: true, data: customer });
  } catch (err) {
    next(err);
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 }).lean();
    res.json({ ok: true, data: customers });
  } catch (err) {
    next(err);
  }
};
