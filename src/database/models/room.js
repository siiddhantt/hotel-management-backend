module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define(
    "room",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      room_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "room-type",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return Room;
};
