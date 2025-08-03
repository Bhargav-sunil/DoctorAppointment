const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

//all doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

//doctor by ID
router.get("/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).send("Doctor not found");
  res.json(doctor);
});

// new doctor
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (err) {
    res.status(400).json({ error: "Failed to add doctor" });
  }
});

module.exports = router;
