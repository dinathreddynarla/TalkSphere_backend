const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  host: { type: String, required: true },
  participants: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
},{ strict: false } );

module.exports = mongoose.model('Meeting', MeetingSchema);
