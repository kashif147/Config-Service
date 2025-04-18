const mongoose = require("mongoose");

const connectB2CDB = () => {
  const b2cDbUri = process.env.B2C_DATABASE_URI;

  if (!b2cDbUri) {
    console.error("B2C_DATABASE_URI is undefined. Check your .env and dotenv.config()");
    return;
  }

  const msConnection = mongoose.createConnection(b2cDbUri);

  msConnection.once("open", () => {
    console.log("Connected to B2C DB");
  });

  msConnection.on("error", (err) => {
    console.error(" Error connecting to Microsoft DB:", err);
  });

  return msConnection;
};

module.exports = connectB2CDB;
