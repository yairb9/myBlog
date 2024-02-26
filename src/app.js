const express = require("express");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.redirect("/posts");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server;
