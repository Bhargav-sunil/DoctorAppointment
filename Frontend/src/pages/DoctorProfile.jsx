import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRes = await fetch(`https://doctorappointment-innh.onrender.com/api/doctors/${id}`);
      const docData = await docRes.json();

      const apptRes = await fetch(
        `https://doctorappointment-innh.onrender.com/api/appointments/doctor/${id}`
      );
      const apptData = await apptRes.json();

      docData.appointments = apptData;
      setDoctor(docData);
    };

    fetchData();
  }, [id]);

  if (!doctor)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading doctor profile...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <div className="flex flex-col items-center text-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-40 h-40 object-cover rounded-full border-4 border-blue-200 shadow-md text-center"
          />
          <h2 className="text-3xl font-bold text-indigo-700 mt-4">
            {doctor.name}
          </h2>
          <p className="text-lg text-gray-700">{doctor.specialization}</p>
          <p
            className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              doctor.status === "Available Today"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {doctor.status}
          </p>
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">
            Appointments
          </h3>
          {doctor.appointments && doctor.appointments.length > 0 ? (
            <ul className="space-y-2 list-none">
              {doctor.appointments.map((appt, idx) => (
                <li key={idx} className="text-gray-700 border-b pb-2">
                  <span className="font-medium text-gray-900">
                    {appt.patientName}
                  </span>{" "}
                  <span className="text-sm text-gray-500">
                    • {new Date(appt.datetime).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No appointments yet</p>
          )}
        </div>

        <div className="mt-8 text-center">
          {doctor.availabilityStatus === "Available Today" ? (
            <Link
              to={`/book/${doctor._id}`}
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
            >
              Book Appointment
            </Link>
          ) : (
            <button
              disabled
              className="inline-block bg-gray-400 text-white font-semibold px-6 py-2 rounded-md cursor-not-allowed opacity-70"
            >
              Not Available for Booking
            </button>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-indigo-600 hover:underline font-medium text-sm"
          >
            ⬅️ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
