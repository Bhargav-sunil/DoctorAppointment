const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

//appointment
router.post("/", async (req, res) => {
  const { doctorId, patientName, email, datetime } = req.body;

  const appointment = new Appointment({
    doctorId,
    patientName,
    email,
    datetime,
  });
  await appointment.save();

  res.status(201).json({ message: "Appointment booked successfully" });
});

// Appointments of doctor
router.get("/doctor/:id", async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

module.exports = router;
