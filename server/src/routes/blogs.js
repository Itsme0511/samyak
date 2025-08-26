import express from "express";
import Blog from "../models/Blog.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/blogs - list blogs sorted by score desc then recent
router.get("/", async (req, res) => {
  try {
    const items = await Blog.find().sort({ score: -1, createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// POST /api/blogs - create blog (auth required)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content = "", url = "" } = req.body || {};
    if (!title || (!content && !url)) {
      return res.status(400).json({ message: "title and content or url required" });
    }
    const blog = await Blog.create({
      title: title.trim(),
      content: (content || "").trim(),
      url: (url || "").trim(),
      authorUserId: req.userId,
      authorName: req.userName || "User",
      score: 0,
      votes: new Map(),
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// PATCH /api/blogs/:id/vote - upvote or downvote (auth)
router.patch("/:id/vote", auth, async (req, res) => {
  try {
    const { value } = req.body || {};
    if (![1, -1, 0].includes(value)) {
      return res.status(400).json({ message: "value must be -1, 0, or 1" });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    const userKey = String(req.userId);
    const current = blog.votes.get(userKey) || 0;

    if (value === 0) {
      blog.votes.delete(userKey);
    } else if (current === value) {
      // toggle off
      blog.votes.delete(userKey);
    } else {
      blog.votes.set(userKey, value);
    }

    blog.score = Array.from(blog.votes.values()).reduce((s, v) => s + (typeof v === "number" ? v : 0), 0);
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to vote" });
  }
});

export default router;
