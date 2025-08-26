import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import levelRoutes from "./routes/levelRoutes.js";
import authRoutes from "./routes/auth.js";
import levelsRoutes from "./routes/levels.js";
import progressRoutes from "./routes/progress.js";
import blogsRoutes from "./routes/blogs.js";



dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Simple health route
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is alive" });
});

app.use("/api/levels", levelRoutes);
app.use("/api/auth", authRoutes);
app.use("/levels", levelsRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/blogs", blogsRoutes);



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

