import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function BookAppointment() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", datetime: "" });
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://doctorappointment-innh.onrender.com/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, doctorId: id }),
    });
    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", email: "", datetime: "" });
      navigate("/doctor/" + id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md transition-all duration-300">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
          Book an Appointment
        </h1>

        {success ? (
          <div className="text-center">
            <p className="text-green-600 font-medium text-lg">
              🎉 Appointment booked successfully!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="datetime"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Confirm Appointment
            </button>
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-indigo-600 hover:underline font-medium text-sm"
              >
                ⬅️ Back to Home
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
