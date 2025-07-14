// models/OrderReport.js
const mongoose = require('mongoose');

const orderReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueType: { type: String, required: true },       // e.g. "Payment Issue", "Delivery Delay"
  serviceStatus: { type: String, required: true },   // e.g. "Pending", "Resolved"
  dateTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderReport', orderReportSchema);
