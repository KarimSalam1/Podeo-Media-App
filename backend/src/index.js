const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const linkRoutes = require("./routes/links");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Podeo Media Player API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
