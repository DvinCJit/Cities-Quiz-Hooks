const express = require("express");
const router = express.Router();

const PlayCtrl = require("./play-ctrl");
router.post("/", PlayCtrl.postName);
router.post("/cities-quiz", PlayCtrl.placeCity);
router.get("/cities-quiz", PlayCtrl.findHighScore);

module.exports = router;
