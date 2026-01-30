const express = require("express");
const Claim = require("../models/claim");
const Deal = require("../models/deal");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

const router = express.Router();

/* ================================
   USER: CLAIM DEAL
================================ */
router.post("/:dealId", auth, async (req, res) => {
  const deal = await Deal.findById(req.params.dealId);

  if (!deal || !deal.isActive) {
    return res.status(404).json({ message: "Deal not found" });
  }

  if (deal.accessLevel === "locked" && !req.user.isVerified) {
    return res.status(403).json({ message: "Verification required" });
  }

  const claim = await Claim.create({
    userId: req.user._id,
    dealId: deal._id,
  });

  res.status(201).json(claim);
});

/* ================================
   USER: MY CLAIMS
================================ */
router.get("/me", auth, async (req, res) => {
  const claims = await Claim.find({ userId: req.user._id })
    .populate("dealId")
    .sort({ createdAt: -1 });

  res.json(claims);
});

/* ================================
   ADMIN: ALL CLAIMS
================================ */
router.get("/", auth, admin, async (req, res) => {
  const claims = await Claim.find()
    .populate("userId", "email")
    .populate("dealId", "title")
    .sort({ createdAt: -1 });

  res.json(claims);
});

/* ================================
   ADMIN: APPROVE / REJECT CLAIM
================================ */
router.patch("/:id", auth, admin, async (req, res) => {
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const claim = await Claim.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(claim);
});

module.exports = router;
