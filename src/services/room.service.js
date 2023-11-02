const { RoomQueries } = require("../database/index");
const Room = new RoomQueries();

class room {
  constructor() {}
  async find_room(req) {
    try {
      let data = await Room.findAll(req.data);
      return data;
    } catch (err) {
      console.log("Error occured --> ", err);
      return err;
    }
  }
  async find_room_data(req) {
    try {
      let data = await Room.findWithJoin(req.data);
      return data;
    } catch (err) {
      console.log("Error occured --> ", err);
      return err;
    }
  }
}

module.exports = room;
