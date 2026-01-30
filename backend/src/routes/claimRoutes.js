const express = require("express");
const Claim = require("../models/claim");
const Deal = require("../models/deal");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CLAIM a deal
 */
router.post("/:dealId", authMiddleware, async (req, res) => {
  try {
    const user = req.user; // ✅ FIX
    const deal = await Deal.findById(req.params.dealId);

    if (!deal || !deal.isActive) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // Block unverified users from locked deals
    if (deal.accessLevel === "locked" && !user.isVerified) {
      return res.status(403).json({
        message: "Verification required to claim this deal",
      });
    }

    const claim = await Claim.create({
      userId: user._id,   // ✅ FIX
      dealId: deal._id,
    });

    res.status(201).json({
      message: "Deal claimed successfully",
      claim,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Deal already claimed",
      });
    }

    console.error("Claim error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET claimed deals for logged-in user
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.user._id }) // ✅ FIX
      .populate("dealId")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    console.error("Fetch claims error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
