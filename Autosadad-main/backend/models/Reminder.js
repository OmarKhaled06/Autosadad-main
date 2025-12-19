const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
  },
  billName: {
    type: String,
    required: true, 
  },
  amount: {
    type: Number,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  reminderDate: {
    type: Date,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["once", "weekly", "monthly"],
    default: "once",
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

module.exports = mongoose.model("Reminder", reminderSchema);