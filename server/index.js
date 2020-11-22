const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const cities = require("./db/capitalCities.json");
const db = require("./db");

const playRouter = require("./play-router");

app.use(cors());
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function callback() {
  // eslint-disable-next-line no-console
  console.log("MongoDB connection established successfully");
});
// Initialize body-parser options (built-in with express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", playRouter);
app.get("/api/cities", (req, res) => {
  res.send(cities);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
