const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const cors = require('cors');
const meetingRoutes = require("./routes/meetingRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/meetings", meetingRoutes);
app.use("/api/users", userRoutes);


// Start Database Connection
connectDB();

module.exports = app;

