const express = require("express");
const passport = require("../passportConfig");
const db = require("../db");

const router = express.Router();

router.get(
  "/user/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const username = req.params.username;
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }
    if (req.user.role < 2 && username != req.user.username) {
      return res.status(403).json({ message: "Forbidden." });
    }
    const query = {
      text: `
        SELECT username, full_name, email, role
        FROM users
        WHERE username = $1
      `,
      values: [username],
    };

    db.query(query)
      .then(({ rows: user }) =>
        res.status(200).json(user.length > 0 ? user[0] : {})
      )
      .catch((error) => {
        console.error("Error during user export", error);
        res.status(500).json({ message: "Internal server error" });
      });
  }
);

module.exports = router;