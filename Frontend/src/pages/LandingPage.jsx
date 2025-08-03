import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`https://doctorappointment-innh.onrender.com/api/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  const filtered = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-6 bg-cover">
      <div className="max-w-5xl mx-auto">
        <Link to="/">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
            🩺 Find Your Doctor
          </h1>
        </Link>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <Link
                to={`/doctor/${doc._id}`}
                key={doc._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 overflow-hidden flex flex-col items-center text-center p-4"
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-32 h-32 object-cover rounded-md shadow-sm border border-gray-200 mb-4"
                />

                <h2 className="text-xl font-semibold text-indigo-800">
                  {doc.name}
                </h2>
                <p className="text-gray-600">{doc.specialization}</p>
                <span
                  className={`mt-1 text-sm font-semibold ${
                    doc.availabilityStatus === "Available Today"
                      ? "text-green-600"
                      : doc.availabilityStatus === "Fully Booked"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {doc.availabilityStatus}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
