const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const { protect } = require("../Middleware/authMiddleware");

// Protect all routes below this line
router.use(protect);

// TEST ROUTE (no DB) – GET /api/reminders/ping
router.get("/ping", (req, res) => {
  console.log("HIT /api/reminders/ping");
  res.json({ message: "reminders ping ok" });
});

// CREATE – POST /api/reminders
router.post("/", async (req, res) => {
  try {
    // Force the userId to be the logged-in user
    req.body.userId = req.user.id;
    
    const reminder = await Reminder.create(req.body);
    res.status(201).json(reminder);
  } catch (err) {
    console.error("Error creating reminder:", err);
    res.status(400).json({ error: err.message });
  }
});

// READ ALL – GET /api/reminders
// Only shows reminders belonging to the logged-in user
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.id }).populate("billId");
    res.json(reminders);
  } catch (err) {
    console.error("Error getting reminders:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ ONE – GET /api/reminders/id/:id
router.get("/id/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id).populate("billId");

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    // Check ownership
    if (reminder.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    res.json(reminder);
  } catch (err) {
    console.error("Error getting reminder by id:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE – PUT /api/reminders/id/:id
router.put("/id/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    // Check ownership
    if (reminder.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const updated = await Reminder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Error updating reminder:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE – DELETE /api/reminders/id/:id
router.delete("/id/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    // Check ownership
    if (reminder.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await reminder.deleteOne();
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    console.error("Error deleting reminder:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;