import express from "express";
import Level from "../models/Level.js";

const router = express.Router();

// GET all levels
router.get("/", async (req, res) => {
  try {
    const levels = await Level.find().sort({ number: 1 });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch levels" });
  }
});

// GET specific level by number
router.get("/:number", async (req, res) => {
  try {
    const level = await Level.findOne({ number: parseInt(req.params.number) });
    if (!level) {
      return res.status(404).json({ error: "Level not found" });
    }
    res.json(level);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch level" });
  }
});

// Seed test levels
router.post("/seed", async (req, res) => {
  const sample = [
    { title: "Basics 1", order: 1, content: "The quick brown fox" },
    { title: "Basics 2", order: 2, content: "Jumps over the lazy dog" },
  ];
  await Level.deleteMany({});
  const seeded = await Level.insertMany(sample);
  res.json(seeded);
});

export default router;

