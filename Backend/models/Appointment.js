const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  patientName: String,
  email: String,
  datetime: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
