const { Pool } = require("pg");
const Sequelize = require("sequelize");

const db = {};
var sequelizeDBConnections = {};
async function DatabaseConnection() {
  const dbConfigurations = {
    app: {
      user: process.env.SQL_DATABASE_USER_APP,
      password: process.env.SQL_DATABASE_PASS_APP,
      server: process.env.SQL_DATABASE_HOST_APP,
      database: process.env.SQL_DATABASE_NAME_APP,
      port: process.env.SQL_DATABASE_PORT_APP,
      dialect: "postgres",
      dialectOptions: {
        instanceName: process.env.SQL_DATABASE_HOST_APP,
      },
    },
  };
  try {
    Object.keys(dbConfigurations).map(async (obj) => {
      if (obj === "app") {
        const dbName = obj;
        obj = dbConfigurations[obj];
        const sequelize = await new Sequelize(
          obj.database,
          obj.user,
          obj.password,
          {
            host: obj.server,
            port: obj.port,
            dialect: obj.dialect,
            ssl: {
              rejectUnauthorized: false,
            },
            dialectOptions: { ssl: false },
            define: { underscored: true },
            operatorAliases: false,
            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 200000,
            },
            logging: false,
          }
        );

        // Connection to DB
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        await sequelize.authenticate().then(async () => {
          console.log("Connection to database successful");
          db.room = await require("./models/room")(sequelize, Sequelize);
          db.roomType = await require("./models/roomType")(
            sequelize,
            Sequelize
          );
          db.booking = await require("./models/booking")(sequelize, Sequelize);
          await sequelize.sync({ force: false }).then((data) => {
            sequelizeDBConnections[dbName] = { is_valid: true, cursor: db };
            global.hotel_db = sequelizeDBConnections[dbName].cursor;
            console.log("Global hotel_db object created");
          });
        });
      }
      global.pool = new Pool({
        user: process.env.SQL_DATABASE_USER_APP,
        password: process.env.SQL_DATABASE_PASS_APP,
        host: process.env.SQL_DATABASE_HOST_APP,
        database: process.env.SQL_DATABASE_NAME_APP,
        port: process.env.SQL_DATABASE_PORT_APP,
      });
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

((module.exports = DatabaseConnection), db), { sequelizeDBConnections };
