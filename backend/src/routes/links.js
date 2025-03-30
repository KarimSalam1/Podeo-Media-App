const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let links = [];

const auth = (req, res, next) => {
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

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

router.use(auth);

router.get("/", (req, res) => {
  try {
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", (req, res) => {
  try {
    const { mp3Url, imageUrl, name } = req.body;

    if (!mp3Url || !name) {
      return res.status(400).json({ message: "MP3 URL and name are required" });
    }

    const newLink = {
      id: Date.now().toString(),
      mp3Url,
      imageUrl,
      name,
      createdBy: req.user.id,
      createdAt: new Date().toISOString(),
    };

    links.push(newLink);

    res.status(201).json(newLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const index = links.findIndex((link) => link.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Link not found" });
    }

    links = links.filter((link) => link.id !== id);

    res.json({ message: "Link removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
