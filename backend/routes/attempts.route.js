const router = require("express").Router();
const Attempt = require("../models/attempt");

/**
 * Save attempt
 */
router.post("/save", async (req, res) => {
  try {
    const { userId, assignmentId, difficulty, sql, correct } = req.body;

    await Attempt.create({
      userId,
      assignmentId,
      difficulty,
      sql,
      correct,
    });

    res.json({ message: "Attempt saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get attempts by user
 */
router.get("/:userId", async (req, res) => {
  try {
    const attempts = await Attempt.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;