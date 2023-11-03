const express = require("express");
const router = express.Router();
const { get_rooms_data } = require("../controllers/room.controller");

router.post("/price", [], get_rooms_data);

module.exports = router;
