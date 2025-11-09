import React from 'react';

import { FaUser, FaClock, FaLayerGroup, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router';

const PublicHabitCard = ({ cart }) => {
  const {
    _id,
    title,
    description,
    category,
    reminderTime,
    image,
    creatorName,
    creatorEmail,
    isPublic,
  } = cart;

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-gray-100">
      {/* Habit Image */}
      <img
        src={image || "https://i.ibb.co/5xX3tK2/default-habit.jpg"}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-purple-700">{title}</h3>
        <p className="text-gray-600 text-sm">{description?.slice(0, 80)}...</p>

        {/* Category & Reminder */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-3">
          <span className="flex items-center gap-1">
            <FaLayerGroup className="text-purple-500" /> {category}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-pink-500" /> {reminderTime || "—"}
          </span>
        </div>

        {/* Creator Info (only if public) */}
        {isPublic && (
          <div className="mt-2 text-gray-500 text-sm space-y-1">
            {creatorName && (
              <p className="flex items-center gap-1">
                <FaUser className="text-purple-400" /> {creatorName}
              </p>
            )}
            {creatorEmail && (
              <p className="flex items-center gap-1">
                <FaEnvelope className="text-pink-400" /> {creatorEmail}
              </p>
            )}
          </div>
        )}

        {/* View Details Button */}
        <Link
          to={`/habit-details/${_id}`}
          className="block text-center mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-xl hover:opacity-90 transition font-semibold shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PublicHabitCard;
