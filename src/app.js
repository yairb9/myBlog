const express = require("express");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.redirect("/posts");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;
