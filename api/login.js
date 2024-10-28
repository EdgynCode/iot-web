const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3050;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/login", (req, res) => {
  // Return mock JSON response
  res.json({
    userName: "username",
    password: "Admin*123!",
  });
});

app.listen(PORT, () => {
  console.log(`Mock API server is running on http://localhost:${PORT}`);
});
