const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  assignmentId: Number,
  difficulty: String,
  sql: String,
  correct: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attempt", attemptSchema);