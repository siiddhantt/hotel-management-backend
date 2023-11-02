const room = require("../services/room.service");
const room_obj = new room();

exports.get_rooms = async (req, res, next) => {
  try {
    const response = await room_obj.find_room({ data: {} });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

exports.get_rooms_data = async (req, res, next) => {
  try {
    const response = await room_obj.find_room_data({
      data: {
        room_id: req.body.room_id,
      },
    });
    res.status(200).json(response.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
