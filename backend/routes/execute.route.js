const express = require("express");
const { executeSQL } = require("../controllers/execute.controller");

const router = express.Router();

router.post("/execute", executeSQL);

module.exports = router;