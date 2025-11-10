import React from "react";
import { motion } from "framer-motion";

const Habit = ({ cart, onUpdate, onDelete, onMarkComplete }) => {
  const {
    title,
    category,
    currentStreak,
    reminderTime,
    createdAt,
    isPublic,
    image,
  } = cart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 my-4"
    >
      <div className="flex flex-col md:flex-row gap-5 items-center">
        {/* Image */}
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title}
          className="w-full md:w-48 h-40 object-cover rounded-lg"
        />

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                isPublic
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {isPublic ? "Public" : "Private"}
            </span>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">📂 Category:</span>{" "}
              {category}
            </p>
            <p>
              <span className="font-medium text-gray-700">⏰ Reminder:</span>{" "}
              {reminderTime || "Not set"}
            </p>
            <p>
              <span className="font-medium text-gray-700">🔥 Streak:</span>{" "}
              {currentStreak || 0} days
            </p>
            <p>
              <span className="font-medium text-gray-700">📅 Created:</span>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-3">
            <button
              onClick={() => onUpdate(cart)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm shadow-sm transition duration-200"
            >
              ✏️ Update
            </button>
            <button
              onClick={() => onDelete(cart)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm shadow-sm transition duration-200"
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => onMarkComplete(cart)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm shadow-sm transition duration-200"
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
