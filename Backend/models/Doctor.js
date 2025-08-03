const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  image: String,
  availabilityStatus: String,
  schedule: [String],
});

module.exports = mongoose.model("Doctor", DoctorSchema);
