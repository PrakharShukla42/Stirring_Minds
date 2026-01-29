const express = require("express");
const Deal = require("../models/deal");

const router = express.Router();

/**
 * GET all deals
 */
router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    console.error("Fetch deals error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET single deal
 */
router.get("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal || !deal.isActive) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json(deal);
  } catch (error) {
    console.error("Fetch deal error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
