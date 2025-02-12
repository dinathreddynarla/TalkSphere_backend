const Meeting = require('../models/Meeting');
const moment = require("moment-timezone");

// Delete Expired Meetings Every meetings
exports.deleteExpiredMeetings = async (req, res) => {
  try {
    // Get the current time in IST
    const currentIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    

    // Log the current IST time (optional)
    console.log(`Current IST Time: ${currentIST}`);
    
    // Delete meetings where `date` is in the past
    const result = await Meeting.deleteMany({ date: { $lt: currentIST } });
    
    // Prepare the response payload
    const response = {
      message: result.deletedCount === 0 ? "No expired meetings found." : `Deleted ${result.deletedCount} expired meetings.`,
      timestamp: currentIST // Include the current timestamp in the response
    };
  
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error deleting expired meetings", error });
  }
};
