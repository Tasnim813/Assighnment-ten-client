import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Habit = ({ cart }) => {
  const { title, category, reminderTime, createdAt, isPublic, image, _id } = cart;
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);

  // ✅ Load current streak info (যাতে ড্যাশবোর্ডে লোড হবার সময় দেখা যায়)
  useEffect(() => {
    fetch(`https://habit-tracker-server-six.vercel.app/habit/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setStreak(data?.streak || 0);
      })
      .catch((err) => console.error("Error fetching habit:", err));
  }, [_id]);

  // ✅ Handle Mark Complete (exact same as PublicHabitDetails)
  const handleMarkComplete = async () => {
    try {
      const res = await fetch(`https://habit-tracker-server-six.vercel.app/habit/${_id}/complete`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        Swal.fire("Info", data.error, "info");
      } else {
        setStreak(data.streak);
        Swal.fire("Success", "Marked complete!", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
const handleDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://habit-tracker-server-six.vercel.app/habit/${_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          navigate('/browsePublicHabit')
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete habit.",
            icon: "error",
          });
        });
    }
  });
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 my-4"
    >
    <div className="flex flex-col md:flex-row gap-5 items-center bg-white shadow-lg border border-purple-200 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300">
  {/* 🖼 Image */}
  <img
    src={image || "https://via.placeholder.com/150"}
    alt={title}
    className="w-full md:w-48 h-40 object-cover rounded-xl border-2 border-purple-300 shadow-md"
  />

  {/* 📄 Content */}
  <div className="flex-1 space-y-3">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-purple-700">{title}</h2>
      <span
        className={`text-xs px-3 py-1 rounded-full font-semibold ${
          isPublic
            ? "bg-purple-100 text-purple-700 border border-purple-300"
            : "bg-gray-100 text-gray-600 border border-gray-300"
        }`}
      >
        {isPublic ? "Public" : "Private"}
      </span>
    </div>

    {/* ℹ️ Habit Info */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1 text-sm text-gray-600">
      <p>
        <span className="font-medium text-purple-700">📂 Category:</span> {category}
      </p>
      <p>
        <span className="font-medium text-purple-700">⏰ Reminder:</span>{" "}
        {reminderTime || "Not set"}
      </p>
      <p>
        <span className="font-medium text-purple-700">🔥 Streak:</span>{" "}
        {streak} days
      </p>
      <p>
        <span className="font-medium text-purple-700">📅 Created:</span>{" "}
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>

    {/* 🧭 Actions */}
    <div className="flex flex-wrap gap-2 pt-3">
      <Link
        to={`/update-habit/${_id}`}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm shadow-md transition duration-200"
      >
        ✏️ Update
      </Link>

      <button
        onClick={handleDelete}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm shadow-md transition duration-200"
      >
        🗑 Delete
      </button>

      <button
        onClick={handleMarkComplete}
     className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm shadow-md transition duration-200"
      >
        ✅ Mark Complete
      </button>
    </div>
  </div>
</div>

    </motion.div>
  );
};

export default Habit;
