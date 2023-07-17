const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");

//Handling unCaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down the server due to unCaught Exception Rejection`);
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connect db
connectDatabase();
//
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Running on the port:${process.env.PORT}`);
});


//unhandled promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
