require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./db/postgres");
const executeRoute = require("./routes/execute.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", executeRoute);

// Root check
app.get("/", (req, res) => {
  res.send("SQL Studio Backend Running");
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});