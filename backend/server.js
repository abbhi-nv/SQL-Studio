require("dotenv").config();

const express = require("express");
const cors = require("cors");

// PostgreSQL
require("./db/postgres");

// MongoDB
const connectMongo = require("./db/mongo");
if (process.env.MONGO_URI) {
  connectMongo();
}

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const executeRoute = require("./routes/execute.route");
app.use("/api", executeRoute);

if (process.env.MONGO_URI) {
  const authRoute = require("./routes/auth.route");
  const attemptsRoute = require("./routes/attempts.route");

  app.use("/api/auth", authRoute);
  app.use("/api/attempts", attemptsRoute);
}

app.get("/", (req, res) => {
  res.send("SQL Studio Backend Running");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});