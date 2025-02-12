
const express = require('express');
const {deleteExpiredMeetings , checkAndActivateMeeting} = require('../controllers/cronController');
const checkApiKey = require('../middleware/cronMiddleware')

const router = express.Router();
// Route to delete expired meetings
router.delete("/delete-expired-meetings",checkApiKey,deleteExpiredMeetings);
router.put("/check-active-meetings",checkApiKey,checkAndActivateMeeting);


module.exports = router;