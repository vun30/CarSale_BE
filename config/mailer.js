// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // dùng 465 thì secure=true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // App Password
  },
});

async function sendLeadEmail({ name, phone, model, source }) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const to = process.env.SMTP_TO || process.env.SMTP_USER;

  const subject = `New lead: ${name} - ${model}`;
  const text = `
New lead received

Name:  ${name}
Phone: ${phone}
Model: ${model}
Source: ${source || "contact-modal"}
Time: ${new Date().toLocaleString()}
  `.trim();

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">New lead received</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 8px"><b>Name</b></td><td>${escapeHtml(
          name
        )}</td></tr>
        <tr><td style="padding:4px 8px"><b>Phone</b></td><td>${escapeHtml(
          phone
        )}</td></tr>
        <tr><td style="padding:4px 8px"><b>Model</b></td><td>${escapeHtml(
          model
        )}</td></tr>
        <tr><td style="padding:4px 8px"><b>Source</b></td><td>${escapeHtml(
          source || "contact-modal"
        )}</td></tr>
        <tr><td style="padding:4px 8px"><b>Time</b></td><td>${new Date().toLocaleString()}</td></tr>
      </table>
    </div>
  `;

  return transporter.sendMail({ from, to, subject, text, html });
}

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = { sendLeadEmail };
