class RoomQueries {
  constructor() {}
  async findAll(data) {
    let order, advancedFilters;
    if (data.order) order = data.order;
    else order = [["id", "ASC"]];

    if (data.advancedFilters) advancedFilters = data.advancedFilters;
    else advancedFilters = null;

    return await hotel_db.room
      .findAll({ where: advancedFilters, order, raw: true })
      .then((response) => {
        if (response === null) throw response;
        return { is_valid: true, data: response };
      })
      .catch((err) => {
        return { is_valid: false, data: err };
      });
  }
  async findWithJoin(data) {
    return await pool.query(
      `SELECT r.id, t.type, t.hourly_rate FROM room r JOIN "room-type" t ON r.room_type_id = t.id AND r.id = $1`,
      [data.room_id]
    );
  }
}

module.exports = RoomQueries;
