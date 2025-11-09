// import React from 'react';
// import { useLoaderData } from 'react-router';

// const PublicHabitDetails = () => {
//     const data=useLoaderData()
//     console.log(data)
//     return (
//         <div>
//             <h1>details here</h1>
//         </div>
//     );
// };

// export default PublicHabitDetails;

import React, { useEffect, useState } from "react";

import { FaClock, FaUser, FaLayerGroup, FaEnvelope } from "react-icons/fa";
import { Link, useParams } from "react-router";

const PublicHabitDetail = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/habit/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHabit(data);
        setLoading(false);
      })
      
  }, [id]);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (!habit) return <p className="text-center py-10 text-red-500">Habit not found.</p>;

  const {
    title,
    description,
    category,
    reminderTime,
    image,
    creatorName,
    creatorEmail,
    isPublic,
  } = habit;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Image */}
      <div className="relative">
        <img
          src={image || "https://i.ibb.co/5xX3tK2/default-habit.jpg"}
          alt={title}
          className="w-full h-72 object-cover rounded-2xl shadow-md"
        />
        <h1 className="absolute bottom-4 left-6 text-3xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 border border-gray-100 space-y-4">
        <h2 className="text-2xl font-semibold text-purple-700">{title}</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>

        {/* Category & Reminder */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mt-3">
          <span className="flex items-center gap-1">
            <FaLayerGroup className="text-purple-500" /> {category}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-pink-500" /> {reminderTime || "No reminder set"}
          </span>
        </div>

        {/* Creator Info */}
        {isPublic && (
          <div className="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-600 space-y-1">
            <p className="flex items-center gap-1">
              <FaUser className="text-purple-400" /> Creator:{" "}
              <span className="font-medium text-gray-800">{creatorName}</span>
            </p>
            <p className="flex items-center gap-1">
              <FaEnvelope className="text-pink-400" /> {creatorEmail}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Link
            to="/browse-public"
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium shadow-sm transition"
          >
            ← Back
          </Link>
          <button
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-md"
          >
            ❤️ Add to My Habits
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicHabitDetail;
