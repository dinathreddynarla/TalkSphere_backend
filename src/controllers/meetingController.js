const Meeting = require('../models/Meeting');

// Schedule a new meeting
exports.scheduleMeeting = async (req, res) => {
  try {
    const { title, description, date, participants } = req.body;
    const meeting = new Meeting({
      title,
      description,
      date,
      host: req.user.uid,
      participants,
    });
    if(title == "Instant Meet"){
      meeting.isActive = true;
    }
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling meeting', error });
  }
};

// Get all meetings for the logged-in user
exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ host: req.user.uid });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meetings', error });
  }
};

// Get a specific meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meeting', error });
  }
};

// Update a meeting
exports.updateMeeting = async (req, res) => {
  try {
    const { title, description, date, duration, participants } = req.body;
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    if (meeting.host !== req.user.uid) return res.status(403).json({ message: 'Access denied' });

    meeting.title = title || meeting.title;
    meeting.description = description || meeting.description;
    meeting.date = date || meeting.date;
    meeting.participants = participants || meeting.participants;

    await meeting.save();
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating meeting', error });
  }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    if (meeting.host !== req.user.uid) return res.status(403).json({ message: 'Access denied' });

    await Meeting.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Meeting deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meeting', error });
  }
};

// Add participant to a meeting
exports.addParticipant = async (req, res) => {
  try {
    const { email } = req.body; // Participant's email
    const { id } = req.params; // Meeting ID

    // Find the meeting by ID
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    if(!meeting.isActive) {
      return res.status(404).json({message : 'Meeting not started yet'});
    }
  
    // Check if the participant is already in the meeting
    if (meeting.participants.includes(email)) {
      return res.status(400).json({ message: 'Participant already added' });
    }

    // Add participant to the meeting
    meeting.participants.push(email);
    await meeting.save();

    res.status(200).json({ message: 'Participant added successfully', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error adding participant', error });
  }
};

exports.startMeetByHost = async (req,res)=>{
  try{
    const { id }  = req.params;
    const meeting = await Meeting.findById(id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    meeting.isActive = true;
    await meeting.save();
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating meeting', error });
  }
}

