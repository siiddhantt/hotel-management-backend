const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const DatabaseConnection = require("./src/database/connection");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
dotEnv.config();
DatabaseConnection();

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hey! Welcome to Hotel Management System." });
});
require("./src/routes/index")(app);

app
  .listen(PORT, () => {
    console.log(`Listening on port --> ${PORT}`);
  })
  .on("error", (err) => {
    console.log(`Error while initiating server --> ${err}`);
    process.exit(1);
  });

module.exports = app;
