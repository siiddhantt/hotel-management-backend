module.exports = (sequelize, Sequelize) => {
  const RoomType = sequelize.define(
    "room-type",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hourly_rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return RoomType;
};
