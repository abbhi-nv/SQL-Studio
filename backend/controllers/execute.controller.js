const pool = require("../db/postgres");

exports.executeSQL = async (req, res) => {
  const { sql } = req.body;

  if (!sql) {
    return res.status(400).json({ error: "SQL query required" });
  }

  try {
    const result = await pool.query(sql);

    res.json({
      columns: result.fields.map(f => f.name),
      rows: result.rows,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};