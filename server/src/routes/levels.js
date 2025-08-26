import express from "express";
import  Level  from "../models/Level.js";

const router = express.Router();

// Get all levels
router.get("/", async (req, res) => {
  try {
    const levels = await Level.find().sort({ number: 1 });
    res.json(levels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch levels" });
  }
});

export default router;

