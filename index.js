const express = require("express");
const connectToDatabase = require("./db");
const cors = require("cors");
require("dotenv").config();
const app = express();
connectToDatabase(); //call function to connect

const userRoutes = require("./routers/userRoute");
const carRouter = require("./routers/carRoute");
const bookingRoute = require("./routers/bookingRoute");
const cookieParser = require("cookie-parser");
const path = require("path");

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://carclient-eight.vercel.app"],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//here we are using middile wares so that first when ever the end-point hits the middleware end point the router executes first
app.use("/user", userRoutes);
app.use("/cars", carRouter);
app.use("/booking", bookingRoute);

// app.get("/sai", adminToken, (req, res) => {
//   res.send("admin pannel working");
// });

app.get("/", (req, res) => {
  console.log("hello i am working");
  res.send("heloo i am working");
});

app.listen(PORT, () => {
  console.log(`server started on http:localhost/${PORT}`);
});
