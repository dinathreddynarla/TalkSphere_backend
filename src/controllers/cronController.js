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


exports.checkAndActivateMeeting = async (req, res) => {
  try {
    // Get the current time in IST and format it as "YYYY-MM-DDTHH:mm:ss.SSSZ"
    const currentIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss.SSSZ");  // Current time in IST
    
    // Log the current IST time (optional)
    console.log(`Current IST Time: ${currentIST}`);
    
    // Fetch the meetings from the database (you can add more conditions if needed)
    const meetings = await Meeting.find({ isActive: false });
    
    // Loop through each meeting to check if it's the scheduled time or 5 minutes before
    for (const meeting of meetings) {
      const scheduledTime = moment(meeting.date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");  // Scheduled time formatted the same way

      // Check if the current time is the scheduled time or within 5 minutes before
      if (currentIST === scheduledTime || moment(currentIST).isBetween(moment(scheduledTime).subtract(5, 'minutes'), scheduledTime)) {
        // Update the isActive field to true
        await Meeting.updateOne(
          { _id: meeting._id }, 
          { $set: { isActive: true } }
        );
        console.log(`Meeting with ID ${meeting._id} has been activated.`);
      }
    }
    
    res.status(200).json({ message: 'Checked and updated meeting statuses.' });
  } catch (error) {
    res.status(500).json({ message: "Error checking and updating meeting status", error });
  }
};
