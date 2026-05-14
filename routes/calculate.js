const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const db = require("../config/db");

const { convert } = require("../utils/converter");


// =========================
// CALCULATE
// =========================

router.post("/", auth, (req, res) => {

  try {

    const {
      type,
      action,
      fromValue,
      fromUnit,
      toValue,
      toUnit,
      operator
    } = req.body;

    let result;

    // =========================
    // CONVERSION
    // =========================

    if (action === "Conversion") {

      result = convert(
        type,
        fromValue,
        fromUnit,
        toUnit
      );

      const expression =
        `${fromValue} ${fromUnit} → ${toUnit}`;

      db.query(
        `INSERT INTO history
        (user_id, action, type, expression, result, unit)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          req.user.id,
          action,
          type,
          expression,
          result.toFixed(4),
          toUnit
        ]
      );

      return res.json({
        result: result.toFixed(4),
        unit: toUnit
      });

    }

    // =========================
    // CONVERT SECOND VALUE
    // =========================

    const secondValueConverted = convert(
      type,
      toValue,
      toUnit,
      fromUnit
    );

    // =========================
    // COMPARISON
    // =========================

    if (action === "Comparison") {

      let comparison;

      if (fromValue > secondValueConverted) {

        comparison = "Greater";

      } else if (fromValue < secondValueConverted) {

        comparison = "Smaller";

      } else {

        comparison = "Equal";

      }

      const expression =
        `${fromValue} ${fromUnit} vs ${toValue} ${toUnit}`;

      db.query(
        `INSERT INTO history
        (user_id, action, type, expression, result)
        VALUES (?, ?, ?, ?, ?)`,
        [
          req.user.id,
          action,
          type,
          expression,
          comparison
        ]
      );

      return res.json({
        result: comparison
      });

    }

    // =========================
    // ARITHMETIC
    // =========================

    if (action === "Arithmetic") {

      let final;

      switch (operator) {

        case "+":
          final = fromValue + secondValueConverted;
          break;

        case "-":
          final = fromValue - secondValueConverted;
          break;

        case "*":
          final = fromValue * secondValueConverted;
          break;

        case "/":

          if (secondValueConverted === 0) {

            return res.status(400).json({
              error: "Cannot divide by zero"
            });

          }

          final = fromValue / secondValueConverted;
          break;

        default:

          return res.status(400).json({
            error: "Invalid operator"
          });

      }

      const expression =
        `${fromValue} ${fromUnit} ${operator} ${toValue} ${toUnit}`;

      db.query(
        `INSERT INTO history
        (user_id, action, type, expression, result, unit)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          req.user.id,
          action,
          type,
          expression,
          final.toFixed(4),
          fromUnit
        ]
      );

      return res.json({
        result: final.toFixed(4),
        unit: fromUnit
      });

    }

    return res.status(400).json({
      error: "Invalid action"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;