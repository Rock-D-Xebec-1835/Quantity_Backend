const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../config/db");

// edited this line
// =========================
// REGISTER
// =========================

router.post("/register", async (req, res) => {

  try {

    const { username, password } = req.body;

    // Check if user already exists
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {

        if (err) {

          return res.status(500).json({
            error: err.message
          });

        }

        if (results.length > 0) {

          return res.status(400).json({
            error: "User already exists"
          });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query(
          "INSERT INTO users(username, password) VALUES (?, ?)",
          [username, hashedPassword],
          (err, result) => {

            if (err) {

              return res.status(500).json({
                error: err.message
              });

            }

            res.json({
              message: "User registered successfully"
            });

          }
        );

      }
    );

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {

        if (err) {

          return res.status(500).json({
            error: err.message
          });

        }

        // User not found
        if (results.length === 0) {

          return res.status(401).json({
            error: "Invalid credentials"
          });

        }

        const user = results[0];

        // Compare password
        const validPassword = await bcrypt.compare(
          password,
          user.password
        );

        if (!validPassword) {

          return res.status(401).json({
            error: "Invalid credentials"
          });

        }

        // Generate JWT
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h"
          }
        );

        res.json({
          token
        });

      }
    );

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;
