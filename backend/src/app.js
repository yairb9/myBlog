const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.redirect("/posts");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;
