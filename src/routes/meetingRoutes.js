const express = require('express');
const { scheduleMeeting, getMeetings, getMeetingById, updateMeeting, deleteMeeting , addParticipant ,startMeetByHost } = require('../controllers/meetingController');
const verifyFirebaseToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyFirebaseToken, scheduleMeeting);
router.get('/', verifyFirebaseToken, getMeetings);
router.get('/:id', verifyFirebaseToken, getMeetingById);
router.put('/:id', verifyFirebaseToken, updateMeeting);
router.delete('/:id', verifyFirebaseToken, deleteMeeting);
router.post('/joinmeet/:id', verifyFirebaseToken, addParticipant);
router.post('/startmeet/:id', verifyFirebaseToken, startMeetByHost);

module.exports = router;