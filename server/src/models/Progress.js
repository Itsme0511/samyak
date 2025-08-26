import mongoose from "mongoose";


const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
  currentLevel: { type: Number, default: 1 },
  completedLevels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level" }],
}, { timestamps: true });

export default mongoose.model("Progress", progressSchema);

