const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");

//config
dotenv.config({ path: "backend/config/config.env" });

//connect db
connectDatabase();
//
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on the port:${process.env.PORT}`);
});
