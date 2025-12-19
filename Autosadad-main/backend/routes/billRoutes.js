const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");
const { protect } = require("../Middleware/authMiddleware");

// PROTECT ALL ROUTES BELOW
router.use(protect);

// CREATE bill
router.post("/", async (req, res) => {
  try {
    // Force userId to be the logged-in user
    req.body.userId = req.user.id; 
    
    const bill = await Bill.create(req.body);
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all bills (Only for the logged-in user)
router.get("/", async (req, res) => {
  try {
    // Automatically filter by the logged-in user
    const bills = await Bill.find({ userId: req.user.id })
      .populate("userId", "username email")
      .sort({ dueDate: 1 });

    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one bill
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    
    // Check existence and ownership
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    if (bill.userId.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not authorized" });
    }

    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE bill
router.put("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Bill not found" });

    // Check ownership
    if (bill.userId.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not authorized" });
    }

    const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE bill
router.delete("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Bill not found" });

    // Check ownership
    if (bill.userId.toString() !== req.user.id) {
        return res.status(401).json({ error: "Not authorized" });
    }

    await bill.deleteOne();
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;