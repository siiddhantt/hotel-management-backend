class RoomQueries {
  constructor() {}
  async findWithJoin(room_id) {
    let response = await pool.query(
      `SELECT r.id, t.type, t.hourly_rate FROM room r JOIN "room-type" t ON r.room_type_id = t.id AND r.id = $1`,
      [room_id]
    );
    return { isValid: true, data: response.rows };
  }
}

module.exports = RoomQueries;
