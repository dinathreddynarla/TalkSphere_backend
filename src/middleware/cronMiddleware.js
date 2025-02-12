// Middleware to check API key
module.exports = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.CRON_API_KEY) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };