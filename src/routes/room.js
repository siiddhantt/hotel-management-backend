const express = require("express");
const router = express.Router();
const { get_rooms, get_rooms_data } = require("../controllers/room.controller");

router.get("/all", [], get_rooms);
router.post("/price", [], get_rooms_data);

module.exports = router;
