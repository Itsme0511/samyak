import express from "express";
import auth from "../middleware/auth.js";
import Progress from "../models/Progress.js";
import Level from "../models/Level.js";

const router = express.Router();

// GET /api/progress - get current user's progress
router.get("/", auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.userId }).populate("completedLevels");
    if (!progress) {
      progress = await Progress.create({ user: req.userId, currentLevel: 1, completedLevels: [] });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// POST /api/progress/complete - mark a level as completed; body: { levelNumber }
router.post("/complete", auth, async (req, res) => {
  try {
    const { levelNumber } = req.body || {};
    if (!levelNumber || typeof levelNumber !== "number") {
      return res.status(400).json({ error: "levelNumber (number) required" });
    }
    const level = await Level.findOne({ number: levelNumber });
    if (!level) return res.status(404).json({ error: "Level not found" });

    let progress = await Progress.findOne({ user: req.userId });
    if (!progress) {
      progress = new Progress({ user: req.userId, currentLevel: 1, completedLevels: [] });
    }

    const already = progress.completedLevels.some((id) => id.toString() === level._id.toString());
    if (!already) progress.completedLevels.push(level._id);

    // Bump currentLevel to the next number if higher
    const nextNumber = level.number + 1;
    if (progress.currentLevel < nextNumber) {
      progress.currentLevel = nextNumber;
    }

    await progress.save();
    const populated = await progress.populate("completedLevels");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

export default router;

