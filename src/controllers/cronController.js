const Meeting = require('../models/Meeting');
const moment = require("moment-timezone");


// Delete Expired Meetings Every meetings
exports.deleteExpiredMeetings = async (req, res) => {
    try {
      // Get the current time in IST
      const currentIST = moment().tz("Asia/Kolkata").toDate();
      console.log(currentIST);
      
      // Delete meetings where `date` is in the past
      const result = await Meeting.deleteMany({ date: { $lt: currentIST } });
  
      if (result.deletedCount === 0) {
        return res.status(200).json({ message: "No expired meetings found." });
      }
  
      res.status(200).json({ message: `Deleted ${result.deletedCount} expired meetings.` });
    } catch (error) {
      res.status(500).json({ message: "Error deleting expired meetings", error });
    }
  };