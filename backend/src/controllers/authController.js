const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // For the demo, im using'password' directly
    // In a real application bcrypt would be used to hash the password
    if (password !== "password") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            username: user.username,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCurrentUser = (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
