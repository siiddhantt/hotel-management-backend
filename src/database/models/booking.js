module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define(
    "booking",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "room",
          key: "id",
        },
        allowNull: false,
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return Booking;
};
