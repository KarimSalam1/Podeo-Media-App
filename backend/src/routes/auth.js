const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Dummy user for demo
const users = [
  {
    id: "1",
    username: "admin",
    password: "password",
    createdAt: new Date().toISOString(),
  },
];

router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user: { id: user.id, username: user.username } },
      process.env.JWT_SECRET || "podeo_media_player_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user", (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "podeo_media_player_secret_key"
    );

    const user = users.find((u) => u.id === decoded.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user;
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
});

module.exports = router;
