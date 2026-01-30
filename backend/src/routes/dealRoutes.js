const express = require("express");
const Deal = require("../models/deal");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

const router = express.Router();

/* GET ALL DEALS */
router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find({
      $or: [{ isActive: true }, { isActive: { $exists: false } }],
    }).sort({ createdAt: -1 });

    res.json(deals);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET SINGLE DEAL */
router.get("/:id", auth, async (req, res) => {
  const deal = await Deal.findById(req.params.id);

  if (!deal || !deal.isActive) {
    return res.status(404).json({ message: "Deal not found" });
  }

  if (deal.accessLevel === "locked" && !req.user.isVerified) {
    return res.status(403).json({ message: "Verification required" });
  }

  res.json(deal);
});

/* CREATE DEAL (ADMIN ONLY) */
router.post("/", auth, admin, async (req, res) => {
  const { title, description, partnerName, accessLevel, category } = req.body;

  if (!title || !description || !partnerName || !accessLevel || !category) {
    return res.status(400).json({ message: "All fields required" });
  }

  const deal = await Deal.create({
    title,
    description,
    partnerName,
    accessLevel,
    category,
    isActive: true,
  });

  res.status(201).json(deal);
});

module.exports = router;
