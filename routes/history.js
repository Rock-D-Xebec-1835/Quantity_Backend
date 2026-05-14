const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const db = require("../config/db");


// =========================
// GET USER HISTORY
// =========================

router.get("/", auth, (req, res) => {

  db.query(
    `SELECT * FROM history
     WHERE user_id = ?
     ORDER BY timestamp DESC`,
    [req.user.id],
    (err, results) => {

      if (err) {

        return res.status(500).json({
          error: err.message
        });

      }

      res.json(results);

    }
  );

});


// =========================
// CLEAR USER HISTORY
// =========================

router.delete("/", auth, (req, res) => {

  db.query(
    "DELETE FROM history WHERE user_id = ?",
    [req.user.id],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          error: err.message
        });

      }

      res.json({
        message: "History cleared"
      });

    }
  );

});

module.exports = router;