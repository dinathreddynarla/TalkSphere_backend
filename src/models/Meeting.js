const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  host: { type: String, required: true },
  participants: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false }  // Set the default value to false
}, { strict: false });

module.exports = mongoose.model('Meeting', MeetingSchema);
