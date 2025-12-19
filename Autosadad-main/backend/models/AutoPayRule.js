const mongoose = require("mongoose");

const autoPayRuleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
    required: true,
  },
  maxAmount: {
    type: Number, // don’t auto-pay if bill is higher than this
    required: true,
  },
  frequency: {
    type: String,
    enum: ["once", "monthly"],
    default: "monthly",
  },
  payBeforeDays: {
    type: Number, // e.g. 2 days before due date
    default: 2,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AutoPayRule", autoPayRuleSchema);