const { RoomQueries } = require("../database/index");
const Room = new RoomQueries();

exports.get_rooms_data = async (req, res, next) => {
  try {
    const { room_id } = req.body;
    let response = await Room.findWithJoin(room_id);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ isValid: false, data: err });
  }
};
