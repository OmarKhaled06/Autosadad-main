const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billType: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true, 
  },
  amount: {
    type: Number,
  },
  dueDate: {
    type: Date,
  },
  referenceNo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bill", billSchema);