const express = require("express");
const router = express.Router();
const PaymentIntegration = require("../models/PaymentIntegration");
const { protect } = require("../Middleware/authMiddleware");

// Protect all routes
router.use(protect);

// CREATE (POST /api/payment-integrations)
router.post("/", async (req, res) => {
  try {
    req.body.userId = req.user.id; // Set user from token
    const payment = await PaymentIntegration.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL (GET /api/payment-integrations)
router.get("/", async (req, res) => {
  try {
    const filter = { userId: req.user.id }; // Force filter by logged-in user

    if (req.query.billId) filter.billId = req.query.billId;
    if (req.query.status) filter.status = req.query.status;

    const payments = await PaymentIntegration.find(filter).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE (GET /api/payment-integrations/:id)
router.get("/:id", async (req, res) => {
  try {
    const payment = await PaymentIntegration.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Payment integration not found" });
    }

    // Check ownership
    if (payment.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (PUT /api/payment-integrations/:id)
router.put("/:id", async (req, res) => {
  try {
    const payment = await PaymentIntegration.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment integration not found" });

    // Check ownership
    if (payment.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const updated = await PaymentIntegration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE (DELETE /api/payment-integrations/:id)
router.delete("/:id", async (req, res) => {
  try {
    const payment = await PaymentIntegration.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment integration not found" });

    // Check ownership
    if (payment.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await payment.deleteOne();
    res.json({ message: "Payment integration deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;