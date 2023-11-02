const express = require("express");
const router = express.Router();
const {
  get_bookings,
  create_booking,
  update_booking,
  delete_booking,
} = require("../controllers/booking.controller");

router.get("/all", [], get_bookings);
router.post("/create", [], create_booking);
router.post("/update", [], update_booking);
router.post("/delete", [], delete_booking);

module.exports = router;
