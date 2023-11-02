var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const room_router = require("./room");
const booking_router = require("./booking");

module.exports = (app) => {
  app.use("/rooms", jsonParser, room_router);
  app.use("/bookings", jsonParser, booking_router);
};
