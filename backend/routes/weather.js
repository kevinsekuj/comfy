const express = require("express");
const router = express.Router();
const weather = require("../controllers/weatherController");

router.route("/").post(weather.getWeather);

module.exports = router;
