const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// przykładowy endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from API!" });
});

// port z ENV albo fallback
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));