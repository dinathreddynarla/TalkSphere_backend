
const express = require('express');
const {deleteExpiredMeetings} = require('../controllers/cronController');
const checkApiKey = require('../middleware/cronMiddleware')

const router = express.Router();
// Route to delete expired meetings
router.delete("/delete-expired-meetings",checkApiKey,deleteExpiredMeetings);

module.exports = router;