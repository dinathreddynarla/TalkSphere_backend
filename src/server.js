require("dotenv").config()
const app = require("./app");
const http = require("http");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;


const logDirectory = path.join(__dirname, "logs");

// Ensure logs directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a write stream for logging
const accessLogStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });

// Middleware for logging requests
app.use(morgan("combined", { stream: accessLogStream }));

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
