import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // index of correct option
  explanation: { type: String, required: true }
});

const levelSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true }, // e.g., 1, 2, 3...
  title: { type: String, required: true }, // e.g., "Basics 1"
  description: { type: String },
  unlockedByDefault: { type: Boolean, default: false }, // true for Level 1
  questions: [questionSchema],
  passingScore: { type: Number, default: 4 }, // minimum correct answers to pass
  totalQuestions: { type: Number, default: 5 }
});

const Level = mongoose.model("Level", levelSchema);
export default Level;
