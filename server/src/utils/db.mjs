import mongoose from "mongoose";
export const connect_db = () => {
  //process.env.DB_LOCAL
  //process.env.DB_REMOTE
  mongoose
    .connect(process.env.DB_REMOTE, {
      ssl: true,
    })
    .then((connection) => {
      console.log(
        "Successfully connected to the database hosted in :",
        connection.connection.host
      );
    })
    .catch((error) => {
      console.log(error);
      console.log("Failed to connect to the database");
    });
};
