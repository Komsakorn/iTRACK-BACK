const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  img: { type: String },
  activityName: {
    type: String,
    minlength: [3, "Activity name should contains at least 3 char"],
  },
  description: { type: String },
  type: { type: String },
  timestamp: { type: Date },
  duration: { type: Number, min: [10, "Duration must be at least 10"] },
  calories: { type: Number, min: [0, "Calories must be at least 0"] },
  tags: { type: Array },
});

const RecordModel = mongoose.model("Activity", recordSchema, "activities");

module.exports = RecordModel;
