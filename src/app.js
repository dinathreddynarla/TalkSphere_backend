const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require('cors');
const meetingRoutes = require("./routes/meetingRoutes");
const userRoutes = require("./routes/userRoutes");
const cronRoutes = require("./routes/cronRoutes");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/meetings", meetingRoutes);
app.use("/users", userRoutes);
app.use("/cron",cronRoutes)


// Start Database Connection
connectDB();

module.exports = app;

