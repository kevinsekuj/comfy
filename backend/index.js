if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();

const path = require("path");
const PORT = process.env.PORT || 3000;

const movies = require("./routes/movies");
const weather = require("./routes/weather");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/weather", weather);
app.use("/movies", movies);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/movies", (req, res) => {
  res.redirect("movies");
});

app.get("/weather", (req, res) => {
  res.redirect("weather");
});

app.all("*", (req, res, next) => {
  next("Resource not found", 404);
});

app.use((err, req, res, next) => {
  res.send(err);
});
