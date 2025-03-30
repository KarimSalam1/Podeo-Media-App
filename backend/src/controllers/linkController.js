const Link = require("../models/Link");

exports.getAllLinks = (req, res) => {
  try {
    const links = Link.getAllLinks();
    res.json(links);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getLinkById = (req, res) => {
  try {
    const link = Link.getLinkById(req.params.id);

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json(link);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createLink = (req, res) => {
  try {
    const { mp3Url, imageUrl, name } = req.body;

    if (!mp3Url || !name) {
      return res.status(400).json({ message: "MP3 URL and name are required" });
    }

    const newLink = Link.createLink({
      mp3Url,
      imageUrl,
      name,
      createdBy: req.user.id,
    });

    res.status(201).json(newLink);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateLink = (req, res) => {
  try {
    const { mp3Url, imageUrl, name } = req.body;

    if (!mp3Url || !name) {
      return res.status(400).json({ message: "MP3 URL and name are required" });
    }

    const updatedLink = Link.updateLink(req.params.id, {
      mp3Url,
      imageUrl,
      name,
    });

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json(updatedLink);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteLink = (req, res) => {
  try {
    const deleted = Link.deleteLink(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json({ message: "Link removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
