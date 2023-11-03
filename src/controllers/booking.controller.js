const { BookingQueries } = require("../database/index");
const Booking = new BookingQueries();

exports.get_bookings = async (req, res) => {
  try {
    let response = await pool.query(
      `SELECT b.*, rt.type as room_type FROM booking b
      JOIN room r ON b.room_id = r.id
      JOIN "room-type" rt ON r.room_type_id = rt.id`
    );
    res.status(200).json({ isValid: true, data: response.rows });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.create_booking = async (req, res) => {
  try {
    const { room_id, user_email, start_time, end_time, amount } = req.body;
    let response = await pool.query(
      `SELECT id 
      FROM booking
      WHERE room_id = $1 AND start_time < $2 AND end_time > $3
      LIMIT 1;`,
      [room_id, end_time, start_time]
    );
    if (response.rows.length > 0)
      res.status(200).json({ isValid: false, data: "Room is already booked" });
    else {
      response = await Booking.insert({
        room_id: room_id,
        user_email: user_email,
        start_time: start_time,
        end_time: end_time,
        amount: amount,
      });
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.update_booking = async (req, res) => {
  try {
    const { id, room_id, user_email, start_time, end_time, amount } = req.body;
    let response = await pool.query(
      `SELECT id 
      FROM booking
      WHERE room_id = $1 AND id != $2 AND start_time < $3 AND end_time > $4
      LIMIT 1;`,
      [room_id, id, end_time, start_time]
    );
    if (response.rows.length > 0)
      res.status(200).json({ isValid: false, data: "Room is already booked" });
    else {
      response = await await pool.query(
        `UPDATE booking
        SET start_time = $1, end_time = $2, user_email = $3, amount = $4
        WHERE id = $5;`,
        [start_time, end_time, user_email, amount, id]
      );
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.delete_booking = async (req, res) => {
  try {
    const { id } = req.body;
    let response = await pool.query(
      `DELETE FROM booking 
      WHERE id = $1`,
      [id]
    );
    res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
