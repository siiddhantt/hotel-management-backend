const { BookingQueries } = require("../database/index");
const Booking = new BookingQueries();

class booking {
  constructor() {}
  async find_bookings(req) {
    try {
      let data = await Booking.findAll(req.data);
      return data;
    } catch (err) {
      console.log("Error occured --> ", err);
      return err;
    }
  }
}

module.exports = booking;
