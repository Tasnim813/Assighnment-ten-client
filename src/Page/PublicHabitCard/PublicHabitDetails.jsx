import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaClock, FaUser, FaLayerGroup, FaEnvelope, FaCheckCircle, FaFire } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";

const PublicHabitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImage = "https://via.placeholder.com/600x400.png?text=No+Image";

  useEffect(() => {
    fetch(`https://habit-tracker-server-six.vercel.app/habit/${id}`)
      .then(res => res.json())
      .then(data => {
        setHabit(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading></Loading>;
  if (!habit) return <p>Habit not found</p>;

  const {
    title,
    description,
    category,
    reminderTime,
    image,
    creatorName,
    creatorEmail,
    streak,
    completionHistory = [],
  } = habit;

  const handleMarkComplete = async () => {
    if (!user) {
      Swal.fire("Login Required", "Please log in to complete this habit.", "info");
      return;
    }

    try {
      const res = await fetch(`https://habit-tracker-server-six.vercel.app/habit/${id}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      });
      const data = await res.json();

      if (data.error) {
        Swal.fire("Info", data.error, "info");
      } else {
        setHabit(prev => ({
          ...prev,
          streak: data.streak,
          completionHistory: data.completionHistory,
        }));
        Swal.fire("Success", "Marked complete!", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const lastCompleted = completionHistory.length
    ? new Date(completionHistory[0]).toDateString()
    : "Not completed yet";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="relative">
        <img
          src={image || defaultImage}
          alt={title}
          className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-md"
        />
        <h1 className="absolute bottom-4 left-6 text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row md:gap-6">
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-purple-700">{title}</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>

            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mt-3">
              <span className="flex items-center gap-1">
                <FaLayerGroup className="text-purple-500" /> {category}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-pink-500" /> {reminderTime || "No reminder set"}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-1">
                <FaUser className="text-purple-400" /> Creator:{" "}
                <span className="font-medium text-gray-800">{creatorName}</span>
              </p>
              <p className="flex items-center gap-1">
                <FaEnvelope className="text-pink-400" /> {creatorEmail}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center mt-6 md:mt-0 space-y-4">
            <div className="w-full text-center">
              <p className="text-gray-700 font-medium mb-2 flex justify-center items-center gap-1">
                <FaFire className="text-orange-500" /> Current Streak
              </p>

              {/* ✅ streak 0 হলে সাদা (inactive look) */}
              <div
                className={`text-3xl font-bold ${
                  streak > 0 ? "text-green-600" : "text-gray-400"
                }`}
              >
                {streak} days
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    streak > 0 ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={{ width: `${Math.min((streak / 30) * 100, 100)}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Last Completed: {lastCompleted}
              </p>
            </div>

            {user && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleMarkComplete}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-md"
              >
                <FaCheckCircle className="inline mr-2" /> Mark Complete
              </motion.button>
            )}
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold text-gray-700 mb-2">Completion History</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {completionHistory.length > 0 ? (
              completionHistory.map((date, i) => (
                <li key={i}>✅ {new Date(date).toDateString()}</li>
              ))
            ) : (
              <li>No completions yet</li>
            )}
          </ul>
        </div>

        <div className="flex justify-start mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium shadow-sm transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicHabitDetails;
