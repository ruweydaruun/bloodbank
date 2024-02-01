const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./src/provider/db");
const path = require('path');
//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", require("./src/routes/testRoutes"));
app.use("/api/v1/auth", require("./src/routes/authRoutes"));
app.use("/api/v1/inventory", require("./src/routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./src/routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./src/routes/adminRoutes"));

//STATIC FOLDER
app.use(express.static(path.join(__dirname,'./client/build')))

//STATIC ROUTES
app.get("*", function (req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
