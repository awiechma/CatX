const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../passportConfig");
const db = require("../db");

const router = express.Router();

/**
 * Endpoint for Creating new Users
 */

router.post("/register", async (req, res) => {
  const { username, full_name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  if (!username || !password || !full_name || !email) {
    return res
      .status(400)
      .json({ message: "You did not fill in all required fields." });
  }

  try {
    // Insert the user
    const insertUserQuery = {
      text: `
        INSERT INTO users (username, full_name, email, password_hash, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $4, $1, $1)
      `,
      values: [username, full_name, email, hashedPassword],
    };
    await db.query(insertUserQuery);
    res.status(200).json({ message: "Registration Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Endpoint for user login and receiving a JWT token
 */
router.post("/token", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Query the database to find the user by username
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Compare provided password with stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/validatetoken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      res.status(200).json({ message: "Token is valid" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
);

module.exports = router;