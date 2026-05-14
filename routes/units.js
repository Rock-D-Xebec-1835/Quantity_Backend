const express = require("express");
const router = express.Router();

const units = require("../data/units");

router.get("/", (req, res) => {
  const type = req.query.type?.toUpperCase();

  if (!type || !units[type]) {
    return res.status(400).json({
      error: "Invalid quantity type"
    });
  }

  res.json(units[type]);
});

module.exports = router;